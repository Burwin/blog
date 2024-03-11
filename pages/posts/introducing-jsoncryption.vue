<script setup lang="ts">
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
    public EncryptAttribute() : ElementsBase(typeof(EncryptedJsonConverterFactory))
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
    <ElementsBp>
      The
      <ElementsBa href="https://github.com/Burwin/JsonCryption" target="_blank"
        >GitHub page</ElementsBa
      >
      covers more details, but this is the gist:
    </ElementsBp>
    <ElementsBh3 id="installation">Installation: </ElementsBh3>
    <ElementsBcode :code="installation"></ElementsBcode>
    <ElementsBh3 id="configuration">Configuration: </ElementsBh3>
    <ElementsBcode :code="configuration"></ElementsBcode>
    <ElementsBh3 id="usage">Usage: </ElementsBh3>
    <ElementsBcode :code="usage"></ElementsBcode>
    <ElementsBh2 id="why-i-need-jsoncryption"
      >Why I need JsonCryption</ElementsBh2
    >
    <ElementsElementsBp>
      My main project (not fully operational) is a .NET Core app that handles
      contact information for users. Being on the OCD spectrum, I wanted this
      data to have stronger protection than just disk-level and/or
      dataElementsBase-level encryption.
    </ElementsElementsBp>
    <ElementsElementsBp>
      Property/field-level encryption - in addition to disk-level and
      dataElementsBase-level encryption - sounded pretty nice. But I needed to
      be able to easily control which fields/properties were encrypted from each
      object.
    </ElementsElementsBp>
    <ElementsElementsBp>
      This project is also using
      <ElementsElementsBa href="https://martendb.io/" target="_blank"
        >Marten</ElementsElementsBa
      >, which uses PostgreSQL as a document DB. Marten stores documents (C#
      objects, essentially) in tables with explicit lookup columns, and one
      column for the JSON blob. From what I could tell, the best hook offered by
      Marten's API to encrypt/decrypt documents automatically is at the point of
      serialization/deserialization by providing an alternative
      <ElementsElementsBa
        href="https://martendb.io/documentation/documents/json/"
        target="_blank"
        >ISerializer</ElementsElementsBa
      >. If I encrypted the entire blob, I wouldn't be able to query anything
      very well. So I needed a way to leave certain columns unencrypted when
      serializing - the ones that would serve as lookups in queries.
    </ElementsElementsBp>
    <ElementsBh2 id="discovery-path">Discovery path</ElementsBh2>
    <ElementsBh3 id="first-stop-newtonsoft-json-encryption"
      >First Stop: Newtonsoft.Json.Encryption</ElementsBh3
    >
    <ElementsElementsBp>
      <ElementsElementsBa
        href="https://github.com/NServiceBusExtensions/Newtonsoft.Json.Encryption"
        target="_blank"
        >This library</ElementsElementsBa
      >
      provided a lot of inspiration. It intends to be very easy to use by
      requiring a single <code>EncryptAttribute</code> to decorate what is to be
      encrypted, and it plugs into Newtonsoft.Json via the
      <code>ContractResolver</code> approach (similar to JsonCryption above).
    </ElementsElementsBp>
    <ElementsElementsBp>
      However, I felt that it had a few fatal flaws that would make using it a
      more difficult than initially meets the eye.
    </ElementsElementsBp>
    <ElementsElementsBp>
      That it doesn't store the Init Vector with the generated ciphertext was a
      non-starter for me. This requires consumers of the library to figure out
      how and where to store it themselves. I'm not a cryptographic expert (use
      JsonCryption at your own risk!), but it seems pretty standard practice to
      include the IV with the ciphertext to enable later decryption with just
      the symmetric key. In any case, this would be a bigger issue after
      <ElementsElementsBa href="#microsoft-aspnetcore-dataprotection"
        >later discoveries</ElementsElementsBa
      >.
    </ElementsElementsBp>
    <ElementsBh3 id="overriding-jsonconverter"
      >Overriding JsonConverter</ElementsBh3
    >
    <ElementsElementsBp>
      Next, I came across
      <ElementsElementsBa
        href="https://thomasfreudenberg.com/archive/2017/02/11/encrypting-values-when-serializing-with-json-net/"
        target="_blank"
        >this blog post</ElementsElementsBa
      >
      by Thomas Freudenberg that used a slightly different approach. Rather than
      provide a custom <code>ContractResolver</code>, he decorated each property
      needing encryption with a custom <code>JsonConverter</code>. His approach
      also offered a normal way to handle the Init Vectors.
    </ElementsElementsBp>
    <ElementsBcode :code="freudenbergAttributes" class="mt-4"></ElementsBcode>
    <ElementsElementsBp>
      This was interesting, but would be annoying to have to type all of that
      for each property needing encryption. Also, I would obviously need a way
      to inject the secret into the converter, rather than hard-code it here.
    </ElementsElementsBp>
    <ElementsElementsBp>
      Nevertheless, it gave me an idea for an approach to use with .NET Core's
      new System.Text.Json library...
    </ElementsElementsBp>
    <ElementsBh3>Initial Attempt for System.Text.Json</ElementsBh3>
    <ElementsElementsBp>
      Microsoft recently released
      <ElementsElementsBa
        href="https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=netcore-3.0"
        target="_blank"
        >System.Text.Json</ElementsElementsBa
      >
      with .NET Core 3.0 as an open-source alternative to the also-open-source
      Newtonsoft.Json, which had been the default JSON serialization library for
      .NET Core up to now. Wanting to be cutting edge, and not knowing much
      about this new library, I started writing my solution around this.
    </ElementsElementsBp>
    <ElementsElementsBp>
      The library has decent documentation, is open-source (as already
      mentioned), and enables powerful serialization customization via an
      unsealed public <code>JsonConverterAttribute</code>. By overriding this
      with my own implementation, I could essentially implement
      <ElementsElementsBa href="#overriding-jsonconverter"
        >Freudenberg's approach</ElementsElementsBa
      >
      with much less code:
    </ElementsElementsBp>
    <ElementsBcode :code="overridingJsonConverter" class="mt-4"></ElementsBcode>
    <ElementsElementsBp>
      Then I just needed to write a custom
      <code>EncryptedJsonConverterFactory</code> to provide the correct
      converter given the datatype being serialized.
    </ElementsElementsBp>
    <ElementsElementsBp>
      But this approach also carried critical issues...
    </ElementsElementsBp>
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
    <ElementsElementsBp>
      <ElementsElementsBa href="https://www.newtonsoft.com/json" target="_blank"
        >Newtonsoft.Json</ElementsElementsBa
      >
      offers support for serializing private to public fields and properties.
      It's a well-known mature library with a highly extensible API. It's
      <code>JsonConverterAttribute</code> is currently sealed, so we can't
      override that... but there are better options for configuring it, anyway,
      in order to take advantage of Dependency Injection and other better
      patterns than I was forced to use with <code>System.Text.Json</code>.
    </ElementsElementsBp>
    <ElementsElementsBp>
      The good news is that the exercise of implementing a solution for
      <code>System.Text.Json</code> forced me to develop some core logic for
      converting different datatypes to and from byte arrays, which would
      <ElementsElementsBa
        href="https://github.com/Burwin/JsonCryption/tree/master/src/JsonCryption/ByteConverters"
        target="_blank"
        >come in handy</ElementsElementsBa
      >
      for encrypting a wide variety of datatypes. Another issue with the other
      libraries and approaches I mentioned earlier is that they only handled a
      tiny number of potential datatypes. I wanted a set-and-forget solution
      that would work widely, so being able to convert all built-in types and
      any nested combination thereof was essential.
    </ElementsElementsBp>
    <ElementsBh2>Adding support for Cryptography best practices</ElementsBh2>
    <ElementsElementsBp>
      I began with a custom implementation and abstraction of the core Encrypter
      that I was using throughout the library. It was ElementsBasic and
      structured largely using inspiration from the two approaches discussed
      earlier.
    </ElementsElementsBp>
    <ElementsElementsBp>It worked.</ElementsElementsBp>
    <ElementsElementsBp>
      But then I attended a great session at
      <ElementsElementsBa href="https://www.codemash.org/" target="_blank"
        >CodeMash</ElementsElementsBa
      >
      2020 called
      <ElementsElementsBa
        href="https://www.codemash.org/session-details/?id=145229"
        target="_blank"
        >Practical Cryptography for Developers</ElementsElementsBa
      >
      . Without getting into the weeds of cryptography, I was exposed for the
      first time to the concept of
      <ElementsElementsBa
        href="https://owasp.org/www-project-cheat-sheets/cheatsheets/Key_Management_Cheat_Sheet"
        target="_blank"
        >key/algorithm rotation</ElementsElementsBa
      >
      and management and cryptographic best practices.
    </ElementsElementsBp>
    <ElementsElementsBp>
      Writing these features into my library would take me far outside its
      immediate domain, and far outside my expertise. Surely, I thought, there
      must be some libraries that handle this already...
    </ElementsElementsBp>
    <ElementsBh3 id="microsoft-aspnetcore-dataprotection"
      >Switching to Microsoft.AspNetCore.DataProtection underneath</ElementsBh3
    >
    <ElementsElementsBp>... yes, there is. Obviously.</ElementsElementsBp>
    <ElementsElementsBp
      >The open-source package
      <ElementsElementsBa
        href="https://docs.microsoft.com/en-us/aspnet/core/security/data-protection/introduction?view=aspnetcore-3.1"
        target="_blank"
        ><code>Microsoft.AspNetCore.DataProtection</code></ElementsElementsBa
      >
      was designed to provide:</ElementsElementsBp
    >
    <ElementsBquote
      name="Microsoft"
      context-url="https://docs.microsoft.com/en-us/aspnet/core/security/data-protection/introduction?view=aspnetcore-3.1"
    >
      a simple, easy to use cryptographic API a developer can use to protect
      data, including key management and rotation
    </ElementsBquote>
    <ElementsElementsBp>
      It's
      <ElementsElementsBa
        href="https://docs.microsoft.com/en-us/aspnet/core/security/data-protection/configuration/?view=aspnetcore-3.1"
        target="_blank"
        >highly configurable</ElementsElementsBa
      >
      , easy to bootstrap, built to promote testability, and built for .NET
      Core. It handles
      <ElementsElementsBa
        href="https://docs.microsoft.com/en-us/aspnet/core/security/data-protection/configuration/default-settings?view=aspnetcore-3.1"
        target="_blank"
        >key management</ElementsElementsBa
      >
      and algorithm management, written by dedicated experts in the field.
    </ElementsElementsBp>
    <ElementsElementsBp
      >So I used that instead of my own
      <code>Encrypter</code>.</ElementsElementsBp
    >
    <ElementsBh2>Closing</ElementsBh2>
    <ElementsElementsBp>
      In the end, I kept both the System.Text.Json implementation
      (<code>JsonCryption.System.Text.Json</code>), and the Newtonsoft.Json
      implementation (<code>JsonCryption.Newtonsoft</code>).
    </ElementsElementsBp>
    <ElementsElementsBp>
      JsonCryption.Newtonsoft is better for the moment, allowing
      encryption/serialization of private to public fields and properties,
      shallow or nested, of (theoretically) any data type that is also
      serializable by Newtonsoft.Json.
    </ElementsElementsBp>
    <ElementsElementsBp>Check it out. Try it out.</ElementsElementsBp>
    <ElementsElementsBp
      >And tell me what you think needs changed to make it
      better.</ElementsElementsBp
    >
  </BlogPost>
</template>
