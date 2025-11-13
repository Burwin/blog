<script setup lang="ts">
const post = {
  date: "2025-11-13",
  title: "Dark Magic",
  excerpt: "It entices us with ultimate power, but at the cost of our souls. (cough AI cough)",
};
</script>

<template>
  <BlogPost
    :date="new Date(post.date)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBp
      >I've been thinking about a lot of things lately, mostly around the theme
      of "craftsmanship".</ElementsBp
    >
    <ElementsBp>Also "greed".</ElementsBp>
    <ElementsBp
      >When making decisions for my business, I've begun to see the seeds of
      greed impacting the decisions I make - or hopefully want to make but avoid
      - ultimately enticing me to do something that I really shouldn't do for
      the long-term benefit of the business, simply because I'm hoping and
      crossing my fingers that the decision will make me a lot of
      money.</ElementsBp
    >
    <ElementsBp>It never does.</ElementsBp>
    <ElementsBp
      >Making the wrong decision for greed is like using dark magic. It entices
      us with ultimate power, but at the cost of our souls. In the case of
      business decisions, it can convince me to do things against the stated and
      felt character of the company in order to chase a quick buck.</ElementsBp
    >
    <ElementsBp>Concrete examples:</ElementsBp>

    <ElementsBul>
      <ElementsBli
        >Take on a project for a technology that we don't know well</ElementsBli
      >
      <ElementsBli
        >Hire a contractor instead of postponing a project until we can handle
        it internally</ElementsBli
      >
    </ElementsBul>

    <ElementsBp
      >On #1, I'm getting better at saying no. As of a couple weeks ago, we will
      no longer do PowerBI, for example. I don't care about this technology.
      It's far from what we're really exceptional at. I don't want to learn it.
      We can't offer the exceptional experience that our customers (and that we)
      expect. It's not worth it.</ElementsBp
    >
    <ElementsBp
      >On #2, we're very peculiar at Bamboo. I hire people with very specific
      skills and personalities, and then train them in a very particular way to
      approach problems from a very particular perspective. Trying to get
      contractors to bolt onto the team and follow along is foolish. It doesn't
      happen. Instead, I get frustrated, and the customer gets frustrated. It's
      not worth it.</ElementsBp
    >
    <ElementsBp
      >I've often equated "software development" to "modern magic":</ElementsBp
    >

    <ElementsBul>
      <ElementsBli
        >We write special incantations (code) that cause the machine to do our
        bidding</ElementsBli
      >
      <ElementsBli
        >We harness powerful invisible forces (computing power, networks, cloud
        services)</ElementsBli
      >
      <ElementsBli
        >If our spells are written incorrectly by a single character, they can
        turn factories into frogs</ElementsBli
      >
      <ElementsBli
        >Most people don't understand how it works, so we seem like wizards to
        them</ElementsBli
      >
    </ElementsBul>

    <ElementsBp
      >Historically, dark magic has been of the flavor of automating spam emails
      and clickbait. This is the obvious dark side.</ElementsBp
    >
    <ElementsBp
      >But I can't stop thinking about AI and slop and craftsmanship and "what
      would the Amish do... if they wrote code?"</ElementsBp
    >
    <ElementsBp>(I like the Amish, btw)</ElementsBp>
    <ElementsBp
      >And what's the motivation for AI software development? It's not all the
      same, sure, but a big push is along the lines of:</ElementsBp
    >

    <ElementsBul>
      <ElementsBli>Vibe code fast (we don't care if it's sloppy)</ElementsBli>
      <ElementsBli
        >Reduce headcount (we want to pinch nickels now to save pennies
        later)</ElementsBli
      >
      <ElementsBli>Automate everything</ElementsBli>
    </ElementsBul>

    <ElementsBp>And it largely works!</ElementsBp>
    <ElementsBp
      >People are building systems really fast, at least to start.</ElementsBp
    >
    <ElementsBp>Companies are reducing headcount, at least for now.</ElementsBp>
    <ElementsBp>But at what cost?</ElementsBp>
    <ElementsBp
      >It isn't just the slop that AI produces, despite our best efforts to
      contain it. There are structural issues that we're sweeping under the
      rug.</ElementsBp
    >
    <ElementsBp
      >Hidden structural issues are the cornerstone of the darkest of magic.
      These are the things that rot a system from the inside, going undetected
      until it's too late to change.</ElementsBp
    >
    <ElementsBp
      >So, what cost for AI development? I'd say it's very similar to the cost
      of the conveniences highlighted in one of the greatest films of all time:
      WALL-E.</ElementsBp
    >
    <ElementsBp
      >People in WALL-E got fat. Unable to think. Unable to walk. Unable to do
      anything.</ElementsBp
    >
    <ElementsBp
      >Heck, even in the real world we have issues like this. Never before have
      we had societal overabundance of food AND information, so that now the
      leading issues facing us our obesity (over-eating) and anxiety
      (over-scrolling).</ElementsBp
    >
    <ElementsBp
      >This is the risk of AI, especially for software development.</ElementsBp
    >
    <ElementsBp
      >One of the most common questions being asked about AI coding agents is
      "if we have these, why hire juniors? If we don't hire juniors, who will
      manage my fleet of agents in the future?"</ElementsBp
    >
    <ElementsBp>Indeed!</ElementsBp>
    <ElementsBp
      >Does that mean we shouldn't eat?!? Of course not.<br />
      Does that mean we shouldn't read?!? Of course not.<br />
      Does that mean we shouldn't use AI?!? Of course not.</ElementsBp
    >
    <ElementsBp>But we should be mindful.</ElementsBp>
    <ElementsBp
      >Fast regularly.<br />
      Read old books regularly.<br />
      Write code "raw dog" regularly.</ElementsBp
    >
    <ElementsBp
      >This is one of the things I'm most excited about while diving into
      NeoVim. I'm even wondering if I should turn off the language server (LSP,
      code completion). Really exercise my coding muscles.</ElementsBp
    >
    <ElementsBp>What do you think? Am I crazy?</ElementsBp>
    <ElementsBp>(No, I'm not)</ElementsBp>
  </BlogPost>
</template>
