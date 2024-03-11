<script setup lang="ts">
const post = {
  date: "2024-02-16",
  title: "Fratres Codicis",
  excerpt:
    "I've mentioned for a while that I see 'reading and writing code today' as similar to 'reading and writing text back then'. But we don't have any orders of monks dedicated to coding for the Church... We should.",
};
</script>

<template>
  <BlogPost
    :date="new Date(post.date)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBquote>Brothers of the Code</ElementsBquote>
    <ElementsBp>
      Monks practically invented universities. They were the driving forces
      behind wisdom and knowledge development for centuries. Largely, this was
      because they could read and write, and most couldn't.
    </ElementsBp>
    <ElementsBp>
      Entire religious orders were established to support and guide these
      dedicated men on their quest to use their knowledge and skills to further
      the cause of the Church and advance society according to a strong set of
      moral values.
    </ElementsBp>
    <ElementsBp>
      I've mentioned for a while that I see "reading and writing code today" as
      similar to "reading and writing text back then". But we don't have any
      orders of monks dedicated to coding for the Church.
    </ElementsBp>
    <ElementsBp> We should. </ElementsBp>
    <ElementsBp>
      And they don't have to be full-time isolated monks, even just a band of
      brothers dedicated to volunteering their time building software and
      automations to further the mission of the Church and improve humanity
      could transform both society and the global Church. The Knights of
      Columbus does fantastic work by way of volunteering laymen, usually with
      families and busy lives.
    </ElementsBp>
    <ElementsBp>
      What would a
      <span class="italic">Knights of Columbus -like</span> organization focused
      on building useful software look like?
    </ElementsBp>
    <ElementsBp>
      The guys at 37Signals are doing some interesting things right now around
      the idea of self-hosting software rather than forcing everybody into
      leasing arrangements at high per-user-per-month rates. Yes, SaaS is easy
      to get started RIGHT NOW for users... but isn't the easy path that offers
      immediate gratification usually the wrong approach long-term? 37Signals
      thinks so. With just a little bit more effort up front, companies can
      stand up their own servers that host their own chat app for pennies
      compared to the cost of Slack for 100+ users every month.
    </ElementsBp>
    <ElementsBp>
      The open source community has known about this for a
      <span class="italic">looong</span> time.
    </ElementsBp>
    <ElementsBp>
      So Fratres Codicis would likely write all its code as open source. What is
      there to hide? As Christians, are we not called to let our light shine?
    </ElementsBp>
    <ElementsBp>
      Monks used to brew beer and participate in other commercial activities in
      the past. Fratres Codicis wouldn't be against generating income in order
      to better support its humanitarian mission to provide quality affordable
      software to the world, without actually being concerned about profit. The
      WordPress model shows that this is still very feasible, even while
      remaining fully open source.
    </ElementsBp>
    <ElementsBquote>
      <ElementsBp>
        SOME USERS: I'll host your open source solution on my own servers.
        Thanks.
      </ElementsBp>
      <ElementsBp>
        FC: "Great! It's our mission to help distribute quality software
        affordably, and free is very affordable."
      </ElementsBp>
      <ElementsBp>
        OTHER USERS: "That's cool, but I really still don't want to manage my
        own servers. Can you do it for me? I still like your mission and want to
        support you."
      </ElementsBp>
      <ElementsBp>
        FC: "No problem! We also offer a fully hosted version at cost, since we
        don't care about profit."
      </ElementsBp>
    </ElementsBquote>
    <ElementsBp>
      There are many SaaS apps (and other software) that are doing simple
      things, but bill on a subscription model so the users don't end up owning
      anything and are instead loosely in debt to the software companies.
      Sometimes this is fine. Sometimes its immoral. When its immoral, the open
      source community has consistently attacked the monopolies by building
      alternatives. Fratres Codicis would continue that mission to a large
      degree. Find apps that are ubiquitous and subscription-based, create
      alternatives that cover the important features, make it very easy to
      self-host, and also offer a very affordable cost-based cloud-hosted
      version.
    </ElementsBp>
    <ElementsBp>
      When the Brother Cloud scales enough, Fratres Codicis can begin to offer a
      more powerful service in the form of a full featured cloud platform. Open
      source solutions already exist to power a platform like this, and can be
      further refined and built out as the Fratres Codicis gains momentum and
      participation. Now, the world will have a formidable cloud platform
      alternative that's ideologically superior to the existing cloud behemoths
      dominating the scene today. The Brother Cloud, being run by a non-profit,
      should also be more affordable once critical mass is reached.
    </ElementsBp>
  </BlogPost>
</template>
