<script setup lang="ts">
const post = {
  date: "2020-02-21",
  title: "Religious Automated Tests",
  excerpt:
    "Writing good software is difficult. Writing good software becomes more difficult as the complexity of the software increases.",
};
</script>

<template>
  <BlogPost
    :date="new Date(post.date)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBp>
      Partly, this is because with greater complexity, it becomes easier to
      break features that had been working well before.
    </ElementsBp>
    <ElementsBp>
      Automated tests mitigate this by providing a protection against unforeseen
      regressions in our software.
    </ElementsBp>
    <ElementsBp>
      The greater the complexity, the greater the benefit that tests provide.
      When the logic of the system is greater than our minds can hold in working
      memory, we can't know if our attempts at improving the system will break
      something else. The thing that we break could even be a core part of the
      system, potentially leading to catastrophic failures.
    </ElementsBp>
    <ElementsBp>
      It isn't just increasing system complexity that makes it more difficult
      for us to introduce improved features without breaking things. If the code
      was written by somebody else, it's more likely that we don't fully
      understand what they did, both in the production code and in the tests.
    </ElementsBp>
    <ElementsBquote
      quote="Why does it do this? Surely they meant it to do that, instead..."
    ></ElementsBquote>
    <ElementsBp>So we make a change, and it breaks a test.</ElementsBp>
    <ElementsBquote
      quote="Hmm... actually, the test looks wrong, too!"
    ></ElementsBquote>
    <ElementsBp>So we "fix" the test we broke...</ElementsBp>
    <ElementsBp>
      After a couple more iterations and releases to production, we start
      getting notifications that the software is behaving very strangely. We
      investigate, and it turns out it's due (obviously) to our not
      understanding the original author's design for the code and the test.
    </ElementsBp>
    <ElementsBp>
      If we could ask them when we have questions, it helps, but doesn't
      eliminate the problem. They themselves have to remember why they made
      certain decisions, perhaps years ago.
    </ElementsBp>
    <ElementsBp>
      If we can't ask them, we're really left in the dark. By default, unless we
      have a VERY strong conviction for why the code and test need to be
      changed, it's generally best to trust the tests.
    </ElementsBp>
    <ElementsBp>
      But, at the end of the day, the tests and code are merely translations of
      the product owner's ideal vision for the software. Developers can't read
      the minds of product owners, so we sometimes translate incorrectly. In
      these cases, we can change the tests... very carefully.
    </ElementsBp>
    <ElementsBp>
      If we inherit a highly complex codebase with a great set of tests, we can
      delete the tests and the code will still run just fine. After deleting the
      tests, we can even introduce some new (non-tested) features with little
      trouble for a time.
    </ElementsBp>
    <ElementsBquote
      quote="See?! We don't need tests! They were just holding us back, making us slow and requiring extra work for no reason at all. We did tests in the past, but that's outdated."
    ></ElementsBquote>
    <ElementsBquote
      quote="Besides, maybe perhaps you could argue that we needed tests back then in the early days, but we're much better programmers now, so we really don't need them anymore."
    ></ElementsBquote>
    <ElementsBp>
      After a couple months, making more and more significant changes to the
      existing codebase - which had been thoroughly tested before we liberated
      our code from the arbitrary shackles of the tests - eventually causes
      bigger and weirder bugs to crop up.
    </ElementsBp>
    <ElementsBp>
      Soon, we inadvertently introduce a bug that threatens the very core of our
      system, threatening to crash the whole thing. Panicked, we begin pointing
      fingers and blaming each other, our managers, our users, and especially
      those idiot developers who used to work here but are long gone. Besides,
      it's the core feature that they developed that's failing now, so it must
      be their fault.
    </ElementsBp>
    <ElementsBp>
      A couple people suggest reinstating the tests. They actually saved them
      locally when we decided to delete them from our code, having suspected
      they were actually not just important, but essential. They thought we were
      making a fatal mistake removing them. Some voiced their opinions, but in
      the end they went along with our plan in order to keep their jobs.
    </ElementsBp>
    <ElementsBquote
      quote="But we can't just add the old tests back! Our code has changed so much, they wouldn't even apply to our modern codebase."
    ></ElementsBquote>
    <ElementsBp>
      It's true. Many of the old tests cover functionality that has since been
      removed, or significantly modified. None of the latest features were ever
      tested. Some of them work more or less as intended, but many behave much
      differently than initially hoped. Their gaps were then patched with more
      new untested code, which caused other strange behaviors to bubble up in
      different places.
    </ElementsBp>
    <ElementsBp>
      The complexity was increasing exponentially, and nobody could make a
      confident change anymore, worried they'd pull the final Jenga block and
      bring the whole thing down for good.
    </ElementsBp>
    <ElementsBp>
      The junior developers were especially paralyzed. Unsure of where to even
      start, they lost their confidence and entrepreneurial spirit, looking only
      to their seniors to solve the crisis for them.
    </ElementsBp>
    <ElementsBp>
      All the while, our tiny competitors began creeping up on our market
      shares. We paid them little mind for the longest time, but now they were
      becoming a real threat. They never removed their tests. After we removed
      ours, we could pivot much faster than they could initially, we being
      unburdened by the need to write new tests and code that passes. We mocked
      them for being old-fashioned and backward.
    </ElementsBp>
    <ElementsBp>
      But now they were encroaching on our markets. Our children wanted their
      devices. They had momentum. We had fear and inaction.
    </ElementsBp>
    <ElementsBp>
      Adding tests back to our codebase will be painful. Many features will have
      to change while we refactor to get the old tests to pass. We'll have to
      devote considerable time writing new tests for the new features that we're
      able to keep. Many features will have to be removed altogether... perhaps
      just for a time... perhaps forever. We'll continue losing ground to our
      competition, forced to spend time getting our testing suite up and running
      again, unable to devote resources to new features.
    </ElementsBp>
    <ElementsBp>
      Maybe we can rebound and retain our spot as the market leader, or maybe
      we're too late and our competitors replace us. Nonetheless, it's becoming
      clear that no matter what... the market leader will have robust tests.
    </ElementsBp>
  </BlogPost>
</template>
