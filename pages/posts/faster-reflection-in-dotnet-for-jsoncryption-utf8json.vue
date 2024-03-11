<script setup lang="ts">
const post = {
  date: "2020-03-13",
  title: "Faster Reflection in .NET for JsonCryption.Utf8Json",
  excerpt:
    "I needed to use Reflection to add support for Utf8Json to JsonCryption. I wanted to support Utf8Json because it's good and fast... but, reflection in .NET is sloooowwww…",
};

const utf8Example = `using Utf8Json;

class Foo
{
    [Encrypt]
    public string LaunchCode { get; }
    ...
}

// setup
IJsonFormatterResolver encryptedResolver = new EncryptedResolver(…);

// serialize/deserialize
var myFoo = new Foo { LaunchCode = "password1" };
string json = JsonSerializer.Serialize(myFoo, encryptedResolver);
Foo deserialized = JsonSerializer.Deserialize<Foo>(json, encryptedResolver);`;

const basicLaunchCode = `{
  id: 123,
  launchCode: <cipher text here...>
}`;

const fooBar = `class Foo
{
    [Encrypt]
    public Bar MyBar { get; }
}

class Bar
{
    public int Countdown { get; }
    public string Message { get; }
}`;

const myBar = `{ Countown: 99, Message: "Bottles of beer on the wall" }`;

const encryptedFoo = `{
  MyBar: <cipher text here...>
}`;

const getMemberInfo = `object value = fieldInfo.GetValue(instance);`;

const buildGetter = `Func<object, object> BuildGetter(MemberInfo memberInfo, Type parentType)
{
    var parameter = Expression.Parameter(ObjectType, "obj");
    var typedParameter = Expression.Convert(parameter, parentType);
    var body = Expression.MakeMemberAccess(typedParameter, memberInfo);
    var objectifiedBody = Expression.Convert(body, ObjectType);
    var lambda = Expression.Lambda<Func<object, object>>(objectifiedBody, parameter);
    return lambda.Compile();
}`;

const reflectionVsCached = `// using reflection
object value = memberInfo.GetValue(instance);

// using the cached delegate
object value = cachedGetter(instance);`;

const fallbackSerializer = `// signature: JsonSerializer.Serializer<T>(ref JsonWriter writer, T value, IJsonFormatterResolver resolver)

internal delegate void FallbackSerializer(
    ref JsonWriter writer,
    object value,
    IJsonFormatterResolver fallbackResolver);

FallbackSerializer BuildFallbackSerializer(Type type)
{
    var method = typeof(JsonSerializer)
        .GetMethods()
        .Where(m => m.Name == "Serialize")
        .Select(m => (MethodInfo: m, Params: m.GetParameters(), Args: m.GetGenericArguments()))
        .Where(x => x.Params.Length == 3)
        .Where(x => x.Params[0].ParameterType == typeof(JsonWriter).MakeByRefType())
        .Where(x => x.Params[1].ParameterType == x.Args[0])
        .Where(x => x.Params[2].ParameterType == typeof(IJsonFormatterResolver))
        .Single().MethodInfo;

    var generic = method.MakeGenericMethod(type);

    var writerExpr = Expression.Parameter(typeof(JsonWriter).MakeByRefType(), "writer");
    var valueExpr = Expression.Parameter(ObjectType, "obj");
    var resolverExpr = Expression.Parameter(typeof(IJsonFormatterResolver), "resolver");

    var typedValueExpr = Expression.Convert(valueExpr, type);
    var body = Expression.Call(generic, writerExpr, typedValueExpr, resolverExpr);
    var lambda = Expression.Lambda<FallbackSerializer>(body, writerExpr, valueExpr, resolverExpr);
    return lambda.Compile();
}`;

const writeDataMember = `static void WriteDataMember(
    ref JsonWriter writer,
    T value,
    ExtendedMemberInfo memberInfo,
    IJsonFormatterResolver formatterResolver,
    IJsonFormatterResolver fallbackResolver,
    IDataProtector dataProtector)
{
    writer.WritePropertyName(memberInfo.Name);
    object memberValue = memberInfo.Getter(value);
    var valueToSerialize = memberInfo.ShouldEncrypt
        ? BuildEncryptedValue(memberValue, memberInfo, fallbackResolver, dataProtector)
        : BuildNormalValue(memberValue, memberInfo, memberInfo.HasNestedEncryptedMembers, formatterResolver);
    JsonSerializer.Serialize(ref writer, valueToSerialize, fallbackResolver);
}

static string BuildEncryptedValue(
    dynamic memberValue,
    ExtendedMemberInfo memberInfo,
    IJsonFormatterResolver fallbackResolver,
    IDataProtector dataProtector)
{
    var localWriter = new JsonWriter();
    memberInfo.FallbackSerializer(ref localWriter, memberValue, fallbackResolver);
    return dataProtector.Protect(localWriter.ToString());
}

static object BuildNormalValue(
    dynamic memberValue,
    ExtendedMemberInfo memberInfo,
    bool hasNestedEncryptedMembers,
    IJsonFormatterResolver formatterResolver)
{
    if (!hasNestedEncryptedMembers)
        return memberValue;

    var localWriter = new JsonWriter();
    memberInfo.FallbackSerializer(ref localWriter, memberValue, formatterResolver);
    return localWriter.ToString();
}`;

const nestedChildEcryptedProperties = `class FooParent
{
    public FooChild Child { get; }
}

class FooChild
{
    [Encrypt]
    public string LaunchCode { get; }
}`;
</script>

<template>
  <BlogPost
    :date="new Date(post.date)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBp>
      Thankfully, through C#'s Expression class, we can cache getters, setters,
      and methods that we discover via <code>System.Reflection</code> initially,
      so that we can use them in the future without going through
      <code>System.Reflection</code> each time thereafter.
    </ElementsBp>
    <ElementsBp>
      I'm late to this game, as Jon Skeet first
      <ElementsBa
        href="https://codeblog.jonskeet.uk/2008/08/09/making-reflection-fly-and-exploring-delegates/"
        target="_blank"
        >wrote about the technique</ElementsBa
      >
      back in 2008. And I believe others had written about it before him.
    </ElementsBp>
    <ElementsBh2>Adding support for Utf8Json</ElementsBh2>
    <ElementsBp>
      From a high-level view, I needed to provide an alternative implementation
      of <code>Utf8Json.IJsonFormatterResolver</code>, as well as
      implementations of <code>Utf8Json.IJsonFormatter&lt;T&gt;</code> in order
      to offer a similar usage API of JsonCryption:
    </ElementsBp>
    <ElementsBcode :code="utf8Example" class="mt-4"></ElementsBcode>
    <ElementsBp>
      The implementation of <code>IJsonFormatterResolver</code> is trivial, just
      getting from a cache or creating an instance of
      <code>IJsonFormatter&lt;T&gt;</code> for each type <code>T</code>. The fun
      starts with the implementation of <code>IJsonFormatter&lt;T&gt;</code>.
    </ElementsBp>
    <ElementsBh2>First, an overview</ElementsBh2>
    <ElementsBp>
      Stepping back for a moment... I don't want to write a JSON serializer.
      Whenever possible, JsonCryption should leverage the serialization logic of
      the given serializer, and only encrypt/decrypt at the correct point in the
      serialization chain. Something like this:
    </ElementsBp>
    <ElementsBh3>Without Encryption</ElementsBh3>
    <ElementsBul>
      <ElementsBli>.NET Object (POCO)</ElementsBli>
      <ElementsBli>(serialize)</ElementsBli>
      <ElementsBli>JSON</ElementsBli>
      <ElementsBli>(deserialize)</ElementsBli>
      <ElementsBli>POCO</ElementsBli>
    </ElementsBul>
    <ElementsBh3>With Encryption</ElementsBh3>
    <ElementsBul>
      <ElementsBli>POCO</ElementsBli>
      <ElementsBli>(serialize)</ElementsBli>
      <ElementsBli>JSON</ElementsBli>
      <ElementsBli>(encrypt)</ElementsBli>
      <ElementsBli>Encrypted JSON</ElementsBli>
      <ElementsBli>(decrypt)</ElementsBli>
      <ElementsBli>JSON</ElementsBli>
      <ElementsBli>(deserialize)</ElementsBli>
      <ElementsBli>POCO</ElementsBli>
    </ElementsBul>
    <ElementsBp>
      Except, this isn't exactly accurate since JsonCryption is doing Field
      Level Encryption (FLE). So as written, the encryption path shown above
      would produce a single blob of cipher text for the Encrypted JSON. We
      instead want a nice JSON document with only the encrypted Fields
      represented in cipher text:
    </ElementsBp>
    <ElementsBcode :code="basicLaunchCode" class="mt-4"></ElementsBcode>
    <ElementsBp>
      So really, the process is something more like this:
    </ElementsBp>
    <ElementsBul>
      <ElementsBli>POCO</ElementsBli>
      <ElementsBli>(serialize)</ElementsBli>
      <ElementsBli>(resolve fields)</ElementsBli>
      <ElementsBli>(serialize/encrypt fields) -> S</ElementsBli>
      <ElementsBli>JSON ...</ElementsBli>
    </ElementsBul>
    <ElementsBh4> (serialize/encrypt fields) for a single field </ElementsBh4>
    <ElementsBul>
      <ElementsBli>S. field</ElementsBli>
      <ElementsBli>S. (write JSON property name)</ElementsBli>
      <ElementsBli>S. (serialize data)</ElementsBli>
      <ElementsBli>S. JSON chunk</ElementsBli>
      <ElementsBli>S. (encrypt serialized data)</ElementsBli>
      <ElementsBli>S. cipher text</ElementsBli>
      <ElementsBli>S. (write cipher text as JSON value)</ElementsBli>
    </ElementsBul>
    <ElementsBp>
      Like this, I (mostly) don't have to worry about serializing/encrypting
      primitive, non-primitive, or user-defined objects. For example, if I have
      something like this...
    </ElementsBp>
    <ElementsBcode :code="fooBar" class="mt-4"></ElementsBcode>
    <ElementsBp>
      … then I will first get something like this during the
      serialization/encryption of <code>MyBar</code>...
    </ElementsBp>
    <ElementsBcode :code="myBar" class="mt-4"></ElementsBcode>
    <ElementsBp>
      Which itself is just a string, and therefore straightforward to encrypt,
      so that the final serialized form of <code>Foo</code> would be something
      like:
    </ElementsBp>
    <ElementsBcode :code="encryptedFoo" class="mt-4"></ElementsBcode>
    <ElementsBp>
      Finally, since I only want to encrypt properties/fields on custom C#
      objects that are decorated with <code>EncryptAttribute</code>, I can
      safely cache an instance of <code>IJsonFormatter&lt;T&gt;</code> for each
      type that I serialize via <code>JsonSerializer.Serialize(…)</code>. This
      is good news, and now we can begin the fun stuff...
    </ElementsBp>
    <ElementsBh2>
      EncryptedFormatter&lt;T&gt; : IJsonFormatter&lt;T&gt;
    </ElementsBh2>
    <ElementsBp>
      As mentioned earlier, for each type <code>T</code>,
      <code>EncryptedFormatter&lt;T&gt;</code> needs to get all properties and
      fields that should be serialized, serialize each one, encrypt those that
      should be encrypted, and write everything to the resulting JSON
      representation of <code>T</code>.
    </ElementsBp>
    <ElementsBh3>Getting the properties and fields</ElementsBh3>
    <ElementsBp>
      Getting a list of properties and fields to be serialized is easy with
      reflection. I can cache the list of resulting <code>MemberInfo</code>'s to
      use each time. So far not bad.
    </ElementsBp>
    <ElementsBh3>
      Serialize each MemberInfo, encrypting when necessary
    </ElementsBh3>
    <ElementsBp>
      When serializing each one, however, some things I need to do include:
    </ElementsBp>
    <ElementsBul>
      <ElementsBli>Get the value from the <code>MemberInfo</code></ElementsBli>
      <ElementsBli>Determine if it needs to be encrypted</ElementsBli>
      <ElementsBli>Serialize (and possibly encrypt) the value</ElementsBli>
    </ElementsBul>
    <ElementsBh4>Get the value from the MemberInfo</ElementsBh4>
    <ElementsBp> With reflection, this is easy, but slow: </ElementsBp>
    <ElementsBcode :code="getMemberInfo" class="mt-4"></ElementsBcode>
    <ElementsBp>
      We could be calling this getter many times in client code, so this should
      be optimized more for speed. Using .NET's <code>Expression</code> library
      to build delegates at run-time has a much larger scope than this post, so
      I'm only going to show end results and maybe discuss a couple points of
      interest. For now, this was my resulting code to build a compiled delegate
      at run-time of the getter for a given <code>MemberInfo</code> (<code
        >PropertyInfo</code
      >
      or <code>FieldInfo</code>), so that I could cache it for reuse:
    </ElementsBp>
    <ElementsBcode :code="buildGetter" class="mt-4"></ElementsBcode>
    <ElementsBp>
      This gives me a delegate to use for this particular
      <code>MemberInfo</code> instance to get its value, bypassing the need to
      use reflection's much slower
      <code>GetValue(object instance)</code> method:
    </ElementsBp>
    <ElementsBcode :code="reflectionVsCached" class="mt-4"></ElementsBcode>
    <ElementsBp>
      As others on the interwebs have mentioned when using this technique, it's
      initially slow since we have to compile code at run-time. But after that,
      it's essentially as fast as a direct access of the property or field.
    </ElementsBp>
    <ElementsBh4> Determine if it needs to be encrypted </ElementsBh4>
    <ElementsBp>
      This is trivial. Just check if it's decorated by
      <code>EncryptAttribute</code> and cache that <code>Boolean</code>.
    </ElementsBp>
    <ElementsBh4> Serialize (and possibly encrypt) the value </ElementsBh4>
    <ElementsBp>
      Initially, I thought I could get away with just using Utf8Json's dynamic
      support when serializing to avoid having to explicitly call the typed
      <code>JsonSerializer.Serialize&lt;T&gt;(…)</code> method for each
      <code>MemberInfo</code>. I got it to work for primitives, but not for more
      complex types.
    </ElementsBp>
    <ElementsBp>
      Hence, I would need to once again use reflection to get the typed
      <code>Serialize&lt;T&gt;</code> method to use for each
      <code>MemberInfo</code> at run-time. Since reflection is slow, I also
      needed to cache this as a compiled delegate:
    </ElementsBp>
    <ElementsBcode :code="fallbackSerializer" class="mt-4"></ElementsBcode>
    <ElementsBp>
      For this, I needed to use a custom delegate due to the
      <code>JsonWriter</code> being passed in by reference, which isn't allowed
      with the built-in <code>Func&lt;&gt;</code>. Beyond that, everything else
      should more or less flow from what we did before with the
      <code>MemberInfo</code> getter.
    </ElementsBp>
    <ElementsBp> Ultimately, this allowed me to do something like: </ElementsBp>
    <ElementsBcode :code="writeDataMember" class="mt-4"></ElementsBcode>
    <ElementsBp> There are a couple things going on here... </ElementsBp>
    <ElementsBp>
      First, I needed to use the <code>localWriter</code> when leaning on
      Utf8Json to serialize at the intermediate stage, because otherwise it
      would restart its internal <code>JsonWriter</code> when calling the
      <code>JsonSerializer.Serialize(instance, fallbackResolver)</code>
      overload. Things were very weird before I realized what was happening with
      this.
    </ElementsBp>
    <ElementsBp>
      Second, you'll see that I needed to do one additional special stage for
      properties that aren't marked to be encrypted themselves. This is to take
      into account nested classes/structs whose children may themselves have
      encrypted members:
    </ElementsBp>
    <ElementsBcode
      :code="nestedChildEcryptedProperties"
      class="mt-4"
    ></ElementsBcode>
    <ElementsBp>
      Because of the possibility of nesting, when building the cached
      <code>EncryptedFormatter&lt;T&gt;</code>, I also needed to traverse every
      nested property and field of <code>T</code> to determine if any were
      decorated by <code>EncryptAttribute</code>. If a nested member needs
      encrypted, then I need to encrypt <code>T</code> itself using the
      <code>EncryptedResolver</code>, eventually returning a JSON string.
      Otherwise, I could do the entire thing normally with the default Utf8Json
      resolver configured by the client, therefore only needing to return the
      original object directly.
    </ElementsBp>
    <ElementsBh2>Conclusion: All theory without benchmarking</ElementsBh2>
    <ElementsBp>
      Is this actually faster than using regular reflection? Did I make the code
      needlessly complicated?
    </ElementsBp>
    <ElementsBp>
      Theoretically, it should be significantly faster, but until I actually
      benchmark it, I won't know for sure.
    </ElementsBp>
    <ElementsBp>
      I've been talking about benchmarking JsonCryption for a while now, so it
      will likely be the next thing I do on this project. Unfortunately, I have
      other projects going on that are more important, so I'm not sure when I'll
      be able to get to it. I'm also not thrilled about slightly rewriting
      <code>JsonCryption.Utf8Json</code> to use reflection just so that I can
      benchmark it.
    </ElementsBp>
    <ElementsBp>
      Encryption itself is slow. I expect the encryption part alone to be a very
      significant piece of the total time spent serializing a given object. But
      again, I won't know until I look into it.
    </ElementsBp>
    <ElementsBp>
      Finally, working on this port of JsonCryption taught me some new
      techniques that I would like to see incorporated into the version for
      <code>Newtonsoft.Json</code>. I'm guessing/hoping I might find some low
      hanging fruit to optimize that one a bit more.
    </ElementsBp>
  </BlogPost>
</template>
