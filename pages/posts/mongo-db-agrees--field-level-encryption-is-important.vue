<script setup lang="ts">
const post = {
  date: "2020-02-29",
  title: "MongoDB Agrees: Field Level Encryption is Important",
  excerpt: "Keep gut healthy. Trust gut.",
};
</script>

<template>
  <BlogPost
    :date="new Date(post.date)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBp>
      I often second-guess myself. The past couple years, I've been trying to
      follow my gut more often. When my gut is healthy, I find myself often
      confirming my initial assumptions.
    </ElementsBp>
    <ElementsBquote>Keep gut healthy. Trust gut.</ElementsBquote>
    <ElementsBp>
      Field Level Encryption (FLE?) for JSON serialization is one of those
      instances.
    </ElementsBp>
    <ElementsBh2>MongoDB Announces Field Level Encryption Feature</ElementsBh2>
    <ElementsBp>
      MongoDB added support for client-side field level encryption in their
      version 4.2 release,
      <ElementsBa
        href="https://www.mongodb.com/press/mongodb-42-adds-distributed-transactions-field-level-encryption-updated-kubernetes-operator-and-more-to-the-leading-modern-general-purpose-database"
        target="_blank"
        >announced way back in June</ElementsBa
      >. Just today there was a post on LinkedIn from MongoDB's account linking
      to a new
      <ElementsBa
        href="https://www.mongodb.com/blog/post/clientside-field-level-encryption-faq--webinar"
        target="_blank"
        >FAQ and webinar</ElementsBa
      >
      on the subject, which is how I realized that they, too, agree it can be a
      useful complement to data-at-rest encryption of particularly sensitive
      data, particularly personally-identifiable information of users:
    </ElementsBp>
    <ElementsBquote>Our implementation of FLE...</ElementsBquote>
    <ElementsBp>
      Great! So I should have trusted my gut on the FLE abbreviation.
    </ElementsBp>
    <ElementsBquote>
      ...is totally separated from the database, making it transparent to the
      server, and instead handled exclusively within the MongoDB drivers on the
      client (hence the name Client-Side Field Level Encryption). All encrypted
      fields on the server - stored in-memory, in system logs, at-rest, and in
      backups - are rendered as ciphertext, making them unreadable to any party
      who does not have client access along with the keys necessary to decrypt
      the data.<br /><br />This is a different and more comprehensive approach
      than the column encryption used in many relational databases. As most
      handle encryption server-side, data is still accessible to administrators
      who have access to the database instance itself, even if they have no
      client access privileges.
    </ElementsBquote>
    <ElementsBp>
      Exactly what I figured would be useful for JsonCryption. Good start!
    </ElementsBp>
    <ElementsBp> Let's see if they validate anything else... </ElementsBp>
    <ElementsBh2>
      More Indirect Validations of JsonCryption from MongoDB
    </ElementsBh2>
    <ElementsBquote>
      <ElementsBh4>Where is FLE most useful for you?</ElementsBh4>
      <ElementsBh4>Regulatory Compliance</ElementsBh4>
      <ElementsBp>
        FLE makes it easier to comply with “right to be forgotten” conditions in
        new privacy regulations such as the
        <ElementsBa
          href="https://www.mongodb.com/collateral/global-data-privacy-gdpr-ccpa-beyond"
          target="_blank"
          >GDPR and the CCPA</ElementsBa
        >
        - simply destroy the customer key and the associated personal data is
        rendered useless.
      </ElementsBp>
    </ElementsBquote>
    <ElementsBp>
      Another key motivation for JsonCryption was to comply with GDPR and the
      CCPA. I like the angle for complying with the "right to be forgotten"
      mentioned here, though. I hadn't thought of that. To make this work, I'll
      have to tweak the creation of <code>IDataProtector</code> instances to
      allow better configuration, so that consumers of JsonCryption will have
      the ability to create a unique <code>IDataProtector</code> instance per
      user, if they wish.
    </ElementsBp>
    <ElementsBp>What else we got?</ElementsBp>
    <ElementsBh3>Key Management Systems</ElementsBh3>
    <ElementsBquote>
      With the addition of FLE, encryption keys are protected in an isolated,
      customer-managed KMS account. Atlas SREs and Product Engineers have no
      mechanism to access FLE KMS keys, rendering data unreadable to any MongoDB
      personnel managing the underlying database or infrastructure for you.
    </ElementsBquote>
    <ElementsBp>
      More confirmation of design decisions for JsonCryption! The primary reason
      I ended up going with the
      <code>Microsoft.AspNetCore.DataProtection</code> package for the actual
      encryption layer was to gain industry-standard KMS (Key Management System)
      functionality. This is essential for any serious consumers of
      JsonCryption.
    </ElementsBp>
    <ElementsBp>
      Other questions I've been thinking about but haven't been able to dive in
      quite yet...
    </ElementsBp>
    <ElementsBh3>Performance</ElementsBh3>
    <ElementsBquote>
      <ElementsBh4>What is the performance impact of FLE?</ElementsBh4>
    </ElementsBquote>
    <ElementsBp>
      JsonCryption is designed to be used as a plugin for JSON serialization. So
      speed matters. But encryption can be slow. That's why from the beginning,
      I've been planning a future post (or more) discussing benchmarking results
      (which I have yet to do).
    </ElementsBp>
    <ElementsBp>
      Additionally, performance gains could be found by adding support for any
      other JSON serialization package than just Newtonsoft.JSON, which is
      notoriously slow. To that end, I'm currently in the middle of working on a
      pretty sweet implementation of a version to work with the blazing fast
      <ElementsBa href="https://github.com/neuecc/Utf8Json/" target="_blank"
        >Utf8Json</ElementsBa
      >, described on its GitHub as being:
    </ElementsBp>
    <ElementsBquote>
      Definitely Fastest and Zero Allocation JSON Serializer for C#(NET, .NET
      Core, Unity, Xamarin).
    </ElementsBquote>
    <ElementsBp>
      They seem to back it up with solid benchmark results.
    </ElementsBp>
    <ElementsBquote context-url="https://github.com/neuecc/Utf8Json/">
      <img src="/img/utf8json.png" />
    </ElementsBquote>
    <ElementsBp>
      So far, this has been a lot fun as I've had the opportunity to explore new
      techniques, particularly in writing Expressions. To wire JsonCryption into
      Utf8Json, I need to do a significant amount of runtime generic method
      resolution and <code>PropertyInfo</code> getting and setting. I would
      typically do all of this with Reflection. Reflection is slow. It would
      completely defeat the purpose of using a very fast serializer (Utf8Json)
      but then chopping off its legs in the encryption layer by relying so
      heavily on Reflection.
    </ElementsBp>
    <ElementsBp>
      So instead of using Reflection constantly, I'm using a bit of Reflection
      to build Expression trees, which I then compile at runtime into generic
      methods, getters, and setters, which are finally cached per type being
      serialized. It's not a new technique by any means - Jon Skeet blogged
      about a flavor (he would say "flavour") of it
      <ElementsBa
        href="https://codeblog.jonskeet.uk/2008/08/09/making-reflection-fly-and-exploring-delegates/"
        target="_blank"
        >all the way back in 2008</ElementsBa
      >
      - but it's new to me.
    </ElementsBp>
    <ElementsBp>Anyway, I should have more on that soon.</ElementsBp>
    <ElementsBp>Back to MongoDB...</ElementsBp>
    <ElementsBh3>
      FLE and Regular At-Rest Encryption are Complementary
    </ElementsBh3>
    <ElementsBquote>
      <ElementsBh4>
        What is the relationship between Client-Side FLE and regular at-rest
        encryption?
      </ElementsBh4>
      <ElementsBp>
        They are independent, but complementary to one another and address
        different threats. You can encrypt data at-rest as usual. Client-side
        FLE provides additional securing of data from bad actors on the server
        side or from unintentional data leaks.
      </ElementsBp>
    </ElementsBquote>
    <ElementsBp>
      This was a key motivation for JsonCryption from the beginning, as well.
      You might be able to satisfy the encryption requirements of GDPR with a
      basic encryption-at-rest policy, but then all a hacker has to do is get
      past your one layer of encryption and they have access to all of your
      data. On the contrary, with field-level encryption, even if they manage to
      hack your system and extract all of your data, they
      <span class="italic">still</span> have to hack multiple fields, which
      could theoretically each be protected by its own unique key.
    </ElementsBp>
    <ElementsBh3> Querying Encrypted Fields Poses Challenges </ElementsBh3>
    <ElementsBquote>
      <ElementsBh4>
        What sort of queries are supported against fields encrypted with
        Client-Side FLE?
      </ElementsBh4>
      <ElementsBp>
        You can perform equality queries on encrypted fields when using
        deterministic encryption. ...
      </ElementsBp>
    </ElementsBquote>
    <ElementsBp>
      JsonCryption was primarily designed with Marten in mind. With that, I knew
      that some sacrifices may need to be made when it comes to querying
      encrypted values. As of now, I haven't tested or played around with any
      scenarios involving querying encrypted fields. For my primary project
      that's using JsonCryption and Marten, my repositories aren't mature enough
      to know whether or not I'll need such capabilities. I've been lightly
      mulling it over in my mind, but for now I'm waiting until a concrete need
      arises before doing anything about it. In the meantime, if anybody is
      interested in exploring such things in JsonCryption, have at it, and
      remember that we take Pull Requests.
    </ElementsBp>
    <ElementsBh3>
      JsonCryption Wants to Support Multiple KMS's in the Future
    </ElementsBh3>
    <ElementsBquote>
      <ElementsBh4>
        Which key management solutions are compatible with Client-Side FLE?
      </ElementsBh4>
      <ElementsBp>...</ElementsBp>
      <ElementsBp>
        We have designed client-side FLE to be agnostic to specific key
        management solutions, and plan on adding direct native support for Azure
        and GCP in the future.
      </ElementsBp>
    </ElementsBquote>
    <ElementsBp>
      As I mentioned earlier, this was a key motivation behind using the
      <code>Microsoft.AspNetCore.DataProtection</code> package under the covers
      to handle the encryption and key management duties. It could be even more
      flexible, of course. While Microsoft's package offers impressive
      functionality and an inviting API for defining key management policies,
      other libraries exist that perform similar and different functions. Adding
      a configuration API and an Adapter Layer in JsonCryption to support
      additional Key Management Systems could be a good future extension point.
    </ElementsBp>
    <ElementsBh3>Where can it be Used?</ElementsBh3>
    <ElementsBquote>
      <ElementsBh4>Where can I use Client-Side FLE?</ElementsBh4>
    </ElementsBquote>
    <ElementsBp>
      For them, anywhere MongoDB is used (obviously). This sounds like a
      fantastic feature. If I was using MongoDB for my other project, I would
      abandon JsonCryption and use MongoDB's solution. I would also feel really
      stupid for spending time working on throwaway code.
    </ElementsBp>
    <ElementsBp>
      However, I'm using PostgreSQL because I like Marten for what I'm doing, so
      I still need another solution. JsonCryption meets this need, and it's
      technically database-agnostic, as long as the JSON serializer for your
      project is configurable/customizable.
    </ElementsBp>
    <ElementsBh2>Off to a Good Start</ElementsBh2>
    <ElementsBp>
      I'm pretty excited reading this update from MongoDB (can you tell?).
      Partly because it's clear that FLE is an emerging thing, and partly
      because many of my early assumptions and motivations at the start of
      JsonCryption were validated by one of the most important global companies
      in the JSON serialization and storage space.
    </ElementsBp>
    <ElementsBp>
      There's still a lot of work that needs done to make JsonCryption into what
      it could be, but I see the potential it has and get pretty excited. If
      anybody wants to help along the way, please reach out. JsonCryption
      deserves better developers than myself working on this.
    </ElementsBp>
  </BlogPost>
</template>
