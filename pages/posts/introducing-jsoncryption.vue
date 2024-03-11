<script setup lang="ts">
import BlogPost from "../../components/BlogPost.vue";
import { bp, ba, bquote } from "../../components/elements";

const post = {
  date: "2020-02-17",
  title: "Introducing JsonCryption!",
  excerpt:
    "I couldn't find a useful .NET library for easy and robust JSON property-level encryption/decryption, so I made one.",
};

const installation = `Install-Package JsonCryption.Newtonsoft
// There's also a version for System.Text.Json, but the implementation
// for Newtonsoft.Json is better, owing to the greater feature surface
// and customizability of the latter at this time.
`;

const configuration = `// pseudo code (assuming using Newtonsoft.Json for serialization)
container.Register<JsonSerializer>(() => new JsonSerializer() {
  ContractResolver = new JsonCryptionContractResolver(container.Resolve<IDataProtectionProvider>())
});
`;

const usage = `var myFoo = new Foo("some important value", "something very public");
class Foo
{
    [Encrypt]
    public string EncryptedString { get; }
    public string UnencryptedString { get; }

    public Foo(string encryptedString, string unencryptedString)
    {
        ...
    }
}
var serializer = // resolve JsonSerializer
using var textWriter = ...
serializer.Serialize(textWriter, myFoo);
// pseudo output: 
// {
//   "encryptedString": "akjdfkldjagkldhtlfkjk...",
//   "UnencryptedString": "something very public"
// }
`;

const freudenbergAttributes = `public class Settings {
    [JsonConverter(typeof(EncryptingJsonConverter), "#my*S3cr3t")]
    public string Password { get; set; }
}`;

const overridingJsonConverter = `public sealed class EncryptAttribute : JsonConverterAttribute
{
    public EncryptAttribute() : base(typeof(EncryptedJsonConverterFactory))
    {
    }
}`;
</script>

<template>
  <BlogPost
    :date="new Date(post.date)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <bp>
      The
      <ba href="https://github.com/Burwin/JsonCryption" target="_blank"
        >GitHub page</ba
      >
      covers more details, but this is the gist:
    </bp>
    <ElementsBh3 id="installation">Installation: </ElementsBh3>
    <ElementsBcode :code="installation"></ElementsBcode>
    <ElementsBh3 id="configuration">Configuration: </ElementsBh3>
    <ElementsBcode :code="configuration"></ElementsBcode>
    <ElementsBh3 id="usage">Usage: </ElementsBh3>
    <ElementsBcode :code="usage"></ElementsBcode>
    <ElementsBh2 id="why-i-need-jsoncryption"
      >Why I need JsonCryption</ElementsBh2
    >
    <ElementsBp>
      My main project (not fully operational) is a .NET Core app that handles
      contact information for users. Being on the OCD spectrum, I wanted this
      data to have stronger protection than just disk-level and/or
      database-level encryption.
    </ElementsBp>
    <ElementsBp>
      Property/field-level encryption - in addition to disk-level and
      database-level encryption - sounded pretty nice. But I needed to be able
      to easily control which fields/properties were encrypted from each object.
    </ElementsBp>
    <ElementsBp>
      This project is also using
      <ElementsBa href="https://martendb.io/" target="_blank">Marten</ElementsBa
      >, which uses PostgreSQL as a document DB. Marten stores documents (C#
      objects, essentially) in tables with explicit lookup columns, and one
      column for the JSON blob. From what I could tell, the best hook offered by
      Marten's API to encrypt/decrypt documents automatically is at the point of
      serialization/deserialization by providing an alternative
      <ElementsBa
        href="https://martendb.io/documentation/documents/json/"
        target="_blank"
        >ISerializer</ElementsBa
      >. If I encrypted the entire blob, I wouldn't be able to query anything
      very well. So I needed a way to leave certain columns unencrypted when
      serializing - the ones that would serve as lookups in queries.
    </ElementsBp>
    <ElementsBh2 id="discovery-path">Discovery path</ElementsBh2>
    <ElementsBh3 id="first-stop-newtonsoft-json-encryption"
      >First Stop: Newtonsoft.Json.Encryption</ElementsBh3
    >
    <ElementsBp>
      <ElementsBa
        href="https://github.com/NServiceBusExtensions/Newtonsoft.Json.Encryption"
        target="_blank"
        >This library</ElementsBa
      >
      provided a lot of inspiration. It intends to be very easy to use by
      requiring a single <code>EncryptAttribute</code> to decorate what is to be
      encrypted, and it plugs into Newtonsoft.Json via the
      <code>ContractResolver</code> approach (similar to JsonCryption above).
    </ElementsBp>
    <ElementsBp>
      However, I felt that it had a few fatal flaws that would make using it a
      more difficult than initially meets the eye.
    </ElementsBp>
    <ElementsBp>
      That it doesn't store the Init Vector with the generated ciphertext was a
      non-starter for me. This requires consumers of the library to figure out
      how and where to store it themselves. I'm not a cryptographic expert (use
      JsonCryption at your own risk!), but it seems pretty standard practice to
      include the IV with the ciphertext to enable later decryption with just
      the symmetric key. In any case, this would be a bigger issue after
      <ElementsBa href="#microsoft-aspnetcore-dataprotection"
        >later discoveries</ElementsBa
      >.
    </ElementsBp>
    <ElementsBh3 id="overriding-jsonconverter"
      >Overriding JsonConverter</ElementsBh3
    >
    <ElementsBp>
      Next, I came across
      <ElementsBa
        href="https://thomasfreudenberg.com/archive/2017/02/11/encrypting-values-when-serializing-with-json-net/"
        target="_blank"
        >this blog post</ElementsBa
      >
      by Thomas Freudenberg that used a slightly different approach. Rather than
      provide a custom <code>ContractResolver</code>, he decorated each property
      needing encryption with a custom <code>JsonConverter</code>. His approach
      also offered a normal way to handle the Init Vectors.
    </ElementsBp>
    <ElementsBcode :code="freudenbergAttributes" class="mt-4"></ElementsBcode>
    <ElementsBp>
      This was interesting, but would be annoying to have to type all of that
      for each property needing encryption. Also, I would obviously need a way
      to inject the secret into the converter, rather than hard-code it here.
    </ElementsBp>
    <ElementsBp>
      Nevertheless, it gave me an idea for an approach to use with .NET Core's
      new System.Text.Json library...
    </ElementsBp>
    <ElementsBh3>Initial Attempt for System.Text.Json</ElementsBh3>
    <ElementsBp>
      Microsoft recently released
      <ElementsBa
        href="https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=netcore-3.0"
        target="_blank"
        >System.Text.Json</ElementsBa
      >
      with .NET Core 3.0 as an open-source alternative to the also-open-source
      Newtonsoft.Json, which had been the default JSON serialization library for
      .NET Core up to now. Wanting to be cutting edge, and not knowing much
      about this new library, I started writing my solution around this.
    </ElementsBp>
    <ElementsBp>
      The library has decent documentation, is open-source (as already
      mentioned), and enables powerful serialization customization via an
      unsealed public <code>JsonConverterAttribute</code>. By overriding this
      with my own implementation, I could essentially implement
      <ElementsBa href="#overriding-jsonconverter"
        >Freudenberg's approach</ElementsBa
      >
      with much less code:
    </ElementsBp>
    <ElementsBcode :code="overridingJsonConverter" class="mt-4"></ElementsBcode>
    <ElementsBp>
      Then I just needed to write a custom
      <code>EncryptedJsonConverterFactory</code> to provide the correct
      converter given the datatype being serialized.
    </ElementsBp>
    <ElementsBp> But this approach also carried critical issues... </ElementsBp>
    <ElementsBul>
      <ElementsBli>
        Overriding the <code>JsonConverterAttribute</code> ultimately required
        using a Singleton pattern rather than clean Dependency Injection
      </ElementsBli>
      <ElementsBli>
        System.Text.Json currently offers no ability to serialize non-public
        properties, nor fields of any visibility. For most DDD scenarios, this
        was also a non-starter.
      </ElementsBli>
    </ElementsBul>
    <ElementsBh2 id="newtonsoft.json">Newtonsoft.Json</ElementsBh2>
    <ElementsBp>
      <ElementsBa href="https://www.newtonsoft.com/json" target="_blank"
        >Newtonsoft.Json</ElementsBa
      >
      offers support for serializing private to public fields and properties.
      It's a well-known mature library with a highly extensible API. It's
      <code>JsonConverterAttribute</code> is currently sealed, so we can't
      override that... but there are better options for configuring it, anyway,
      in order to take advantage of Dependency Injection and other better
      patterns than I was forced to use with <code>System.Text.Json</code>.
    </ElementsBp>
    <ElementsBp>
      The good news is that the exercise of implementing a solution for
      <code>System.Text.Json</code> forced me to develop some core logic for
      converting different datatypes to and from byte arrays, which would
      <ElementsBa
        href="https://github.com/Burwin/JsonCryption/tree/master/src/JsonCryption/ByteConverters"
        target="_blank"
        >come in handy</ElementsBa
      >
      for encrypting a wide variety of datatypes. Another issue with the other
      libraries and approaches I mentioned earlier is that they only handled a
      tiny number of potential datatypes. I wanted a set-and-forget solution
      that would work widely, so being able to convert all built-in types and
      any nested combination thereof was essential.
    </ElementsBp>
    <ElementsBh2>Adding support for Cryptography best practices</ElementsBh2>
    <ElementsBp>
      I began with a custom implementation and abstraction of the core Encrypter
      that I was using throughout the library. It was basic and structured
      largely using inspiration from the two approaches discussed earlier.
    </ElementsBp>
    <ElementsBp>It worked.</ElementsBp>
    <ElementsBp>
      But then I attended a great session at
      <ElementsBa href="https://www.codemash.org/" target="_blank"
        >CodeMash</ElementsBa
      >
      2020 called
      <ElementsBa
        href="https://www.codemash.org/session-details/?id=145229"
        target="_blank"
        >Practical Cryptography for Developers</ElementsBa
      >
      . Without getting into the weeds of cryptography, I was exposed for the
      first time to the concept of
      <ElementsBa
        href="https://owasp.org/www-project-cheat-sheets/cheatsheets/Key_Management_Cheat_Sheet"
        target="_blank"
        >key/algorithm rotation</ElementsBa
      >
      and management and cryptographic best practices.
    </ElementsBp>
    <ElementsBp>
      Writing these features into my library would take me far outside its
      immediate domain, and far outside my expertise. Surely, I thought, there
      must be some libraries that handle this already...
    </ElementsBp>
    <ElementsBh3
      >Switching to Microsoft.AspNetCore.DataProtection underneath</ElementsBh3
    >
    <ElementsBp>... yes, there is. Obviously.</ElementsBp>
    <ElementsBp
      >The open-source package
      <ElementsBa
        href="https://docs.microsoft.com/en-us/aspnet/core/security/data-protection/introduction?view=aspnetcore-3.1"
        target="_blank"
        ><code>Microsoft.AspNetCore.DataProtection</code></ElementsBa
      >
      was designed to provide:</ElementsBp
    >
    <ElementsBquote
      quote="a simple, easy to use cryptographic API a developer can use to protect data, including key management and rotation"
      name="Microsoft"
      context-url="https://docs.microsoft.com/en-us/aspnet/core/security/data-protection/introduction?view=aspnetcore-3.1"
    ></ElementsBquote>
    <ElementsBp>
      It's
      <ElementsBa
        href="https://docs.microsoft.com/en-us/aspnet/core/security/data-protection/configuration/?view=aspnetcore-3.1"
        target="_blank"
        >highly configurable</ElementsBa
      >
      , easy to bootstrap, built to promote testability, and built for .NET
      Core. It handles
      <ElementsBa
        href="https://docs.microsoft.com/en-us/aspnet/core/security/data-protection/configuration/default-settings?view=aspnetcore-3.1"
        target="_blank"
        >key management</ElementsBa
      >
      and algorithm management, written by dedicated experts in the field.
    </ElementsBp>
    <ElementsBp
      >So I used that instead of my own <code>Encrypter</code>.</ElementsBp
    >
    <ElementsBh2>Closing</ElementsBh2>
    <ElementsBp>
      In the end, I kept both the System.Text.Json implementation
      (<code>JsonCryption.System.Text.Json</code>), and the Newtonsoft.Json
      implementation (<code>JsonCryption.Newtonsoft</code>).
    </ElementsBp>
    <ElementsBp>
      JsonCryption.Newtonsoft is better for the moment, allowing
      encryption/serialization of private to public fields and properties,
      shallow or nested, of (theoretically) any data type that is also
      serializable by Newtonsoft.Json.
    </ElementsBp>
    <ElementsBp>Check it out. Try it out.</ElementsBp>
    <ElementsBp
      >And tell me what you think needs changed to make it better.</ElementsBp
    >
  </BlogPost>
</template>
