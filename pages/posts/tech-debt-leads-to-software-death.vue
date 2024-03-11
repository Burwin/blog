<script setup lang="ts">
const post = {
  date: "2020-02-27",
  title: "Tech Debt Leads to Software Death",
  excerpt:
    "When we don't write the code that we know we should write, we incur tech debt. When we write code that we know we shouldn't, we incur tech debt. When we write code in a way that we know could be better, we incur tech debt.",
};
</script>

<template>
  <BlogPost
    :date="new Date(post.date)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBh2>How it starts...</ElementsBh2>
    <ElementsBp>
      We make these decisions because they're quick fixes to our problems right
      now. Instant gratification satiates our immediate concerns at the expense
      of our future selves (and others).
    </ElementsBp>
    <ElementsBp>
      When we incur tech debt, we're figuratively running up the balance on our
      tech credit card. At first, we get a quick win without any obvious
      drawbacks. "I'll pay it off right away!" we promise ourselves.
    </ElementsBp>
    <ElementsBp>
      But before we refactor, we come up against another
      <span class="italic">super urgent</span> problem. "It's also small...
      let's just do this one more time," we convince ourselves.
    </ElementsBp>
    <ElementsBquote quote="It's not like I'll let this get out of control.">
    </ElementsBquote>
    <ElementsBp>We know how this story turns out...</ElementsBp>
    <ElementsBquote
      quote="But it isn't our fault! We're only developers, after all. With constant pressure to deliver working software, we just have to take shortcuts. Besides, employee turnover is so fast in this industry that I'll be long gone before I need to worry about the effects, anyway."
    ></ElementsBquote>
    <ElementsBh2>Now what?</ElementsBh2>
    <ElementsBp>
      Like financial debt, tech debt comes on slowly and imperceptibly. As it
      grows, it gradually reduces our ability to do things that we need and want
      to do, because ultimately we become slaves to the interest payments that
      our debt master demands. Soon, we can't create new features, or any new
      features we manage to squeak out are riddled with bugs. The longer the
      debt accumulates, the harder it is to bite the bullet and start cleaning
      things up again. We can't innovate or invest for the future, because we're
      swamped just trying to keep up with the maintenance payments.
    </ElementsBp>
    <ElementsBp>
      While in maintenance mode, we're stagnating at best. More likely, our
      software health continues to degrade.
    </ElementsBp>
    <ElementsBp>
      Eventually, our competitors are beating us so badly that they put us out
      of <span class="line-through">our misery</span> business.
    </ElementsBp>
    <ElementsBh2>We've all incurred tech debt</ElementsBh2>
    <ElementsBp>
      I've heard it said that the ancient Israelites used the same word for
      "sin" and "debt". It may be true, but I couldn't verify it after
      exhaustively searching Google for 3 minutes.
    </ElementsBp>
    <ElementsBp>
      But debt and sin have been closely linked in Christian theology going back
      to its origins.
    </ElementsBp>
    <ElementsBquote
      quote="The wages of sin is death."
      name="Romans 6:23"
    ></ElementsBquote>
    <ElementsBp>
      And our tech debt doesn't just impact ourselves. It affects everybody in
      the company. Really, if you think about it, it impacts everybody in the
      world - now and going forward - since what we produce directly contributes
      to the joy, efficiency, health, and more of the aggregate human
      population.
    </ElementsBp>
    <ElementsBp> Is there a verse related to this, too? </ElementsBp>
    <ElementsBquote
      quote="Wherefore as by one man sin entered into this world, and by sin death; and so death passed upon all men, in whom all have sinned."
      name="Romans 5:12"
    ></ElementsBquote>
    <ElementsBp>
      Just replace "sin" with "tech debt"... I didn't because I didn't want to
      write blasphemy.
    </ElementsBp>
    <ElementsBh2>Confession and Rectification</ElementsBh2>
    <ElementsBp>
      Today is Ash Wednesday, a day that marks the annual period of Lent, which
      Catholics devote to confession of sins, sacrifice, and penance, leading up
      to the eventual rebirth and fresh start celebrated at Easter. It's a
      valuable 40 days in which we can reevaluate and make ourselves aware of
      our mistakes in the past year so that we can aim to do better going
      forward. We are to remind ourselves of things we did that we know we
      shouldn't have done, and of things that we did not do that we know we
      should have. Without this rhythmic focus each year, it becomes more likely
      that our guilt and bad habits continue to take control of us, like growing
      financial debt causes us to worry and takes over our economic lives, and
      like growing technical debt gives us guilt and worry and takes over our
      software.
    </ElementsBp>
    <ElementsBp>
      Many of us work under different Agile setups, with similar rituals to
      analyze and continually improve the Agile process itself. But how many of
      us also have periods of time explicitly set aside for nothing other than
      reviewing old code? Code that we know is there, gnawing at our developer
      conscience. Code that we hope our peers don't discover, because we know
      they'd judge us... and rightfully so!!
    </ElementsBp>
    <ElementsBp>
      Maybe it's better if we're given the opportunity to confess our technical
      sins in relative privacy, perhaps to a more talented and experienced
      developer... somebody who we look up to as a sort of mentor....... a
      coding father figure, if you will.
    </ElementsBp>
    <ElementsBquote
      quote="I made took a shortcut here, and I'm sorry about it. What can I do to make it better and get a fresh start?"
    ></ElementsBquote>
    <ElementsBquote
      quote="Write two integration tests and nine unit tests. It will be okay. Go and code better."
    ></ElementsBquote>
    <ElementsBp>
      At what sort of frequency should this happen? No clue... I'm still just a
      baby figuring things out. I just know that it should happen. It's
      important enough to make it an explicitly set-aside ritual in our
      sprints... as critical as daily stand-ups and sprint retrospectives.
    </ElementsBp>
  </BlogPost>
</template>
