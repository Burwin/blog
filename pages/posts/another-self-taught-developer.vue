<script setup lang="ts">
const post = {
  date: "2020-02-05",
  title: "Another Self-Taught Developer",
  excerpt:
    "When finally making the switch to a full-time dev, I came across the famous parable of ElementsBamboo for the first time. TLDR, once a ElementsBamboo seedling begins growing, it doesn't sprout above ground for the first five years. During that time, it stays busy building a strong and elaborate root system to anchor itself when it finally grows to be more than 80 feet tall. When it finally does sprout, it shoots up multiple stories in a matter of weeks.",
};
</script>

<template>
  <BlogPost
    :date="new Date(post.date)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBh2> Learning how to Pronounce Integer </ElementsBh2>
    <ElementsBp>
      When I was ten years old, my dad dropped off a couple old programming
      books after one of his visits. One was an intro to C.
    </ElementsBp>
    <ElementsBp>
      At the time, I was in love with a little-known footElementsBall video game
      that was decades ahead of its time in terms of off-the-field team
      management features, called Total Control FootElementsBall. Gamespot says:
    </ElementsBp>
    <ElementsBquote
      name="Gamespot"
      contextText="Total Control FootElementsBall Review"
      contextUrl="https://www.gamespot.com/reviews/total-control-footElementsBall-review/1900-2535192/"
    >
      I'm not sure if there was a demand for it, but here it is: a
      footElementsBall simulation for pigskin fans who love micromanagement.
    </ElementsBquote>
    <ElementsBp>It was glorious. Madden is still catching up.</ElementsBp>
    <ElementsBp>
      So shortly after failing to build a flying set of glider wings out of
      sticks and duct-tape, I set out learning how to code so I could build an
      awesome game of my own...
    </ElementsBp>
    <ElementsBp>
      I don't remember much of my early reading from the book, but I remember
      generally just re-typing the example programs listed in its pages.
      Attempting to compile them taught me early on how rage-inducing a missing
      semicolon could be ElementsBack then before intelligent IDEs could spot
      the obvious. The one thing I do know is that, thanks to this book, I
      learned the word integer long before finally hearing it pronounced (it's
      NOT a hard 'G').
    </ElementsBp>
    <ElementsBp>
      Over the years, I'd convince my mother and myself that what I really
      wanted for Christmas was the newest version of Visual C++, even though I
      really couldn't use it.
    </ElementsBp>
    <ElementsBh2>Discovering a Taste</ElementsBh2>
    <ElementsBp>
      In college, I was able to get a copy of SQL Server Management Studio. I'm
      not sure if I used up a Christmas or birthday gift for it, or if I was
      able to obtain an academic version through my university. With my now
      budding passion for stock options, and exposure to data mining thanks to
      an undergrad professor that let me unofficially audit his masters-level
      course on the subject, I had a grand plan to discover a money-printing
      covered call trading strategy. For a couple hundred bucks (I had a credit
      card and wasn't yet afraid of debt), I was able to purchase a few years
      worth of historical stock option market data. My goal was to load it into
      my dataElementsBase, clean it up, and then unleash the power of SSMS's
      data mining module to find the Holy Grail. I knew it would work, which
      kept the motivation strong. At the same time, I knew there was no chance
      that it would work, which led to my ultimate justification:
    </ElementsBp>
    <ElementsBquote name="me">
      Even if it doesn't work, I'll learn a bit of SQL and how to work with a
      dataElementsBase.
    </ElementsBquote>
    <ElementsBp>
      I took a couple programming courses in college: Intro to Java and
      Numerical Methods I/II (using Matlab). Otherwise, I wouldn't dabble in any
      coding until the end of my first internship in Paris.
    </ElementsBp>
    <ElementsBh2>Getting in the Zone</ElementsBh2>
    <ElementsBp>
      While attending business school for an MElementsBa, I started an
      internship on the trading floor of BNP PariElementsBas in Paris at the
      height (trough?) of the 2009 financial crisis. At the end, I was out of
      work on my last day, so I spent the day building an "art macro" in Excel.
      It did nothing more than randomly cycle through colors within cells,
      influenced by neighboring cells, creating a swaying mosaic of color.
    </ElementsBp>
    <ElementsBp>
      In my next internship (now Societe Generale), I actually used my budding
      VElementsBa skills for real work. After a month or so, I was told that I
      would be taking over the weekly responsibility of creating/updating a
      standard internal report on the Credit market for our traders. The intern
      passing off her mantel showed me all the tedious manual steps she would
      take to update it, ultimately spending around a half-day every week. There
      had to be a better way! Thankfully, my managers gave me the freedom to
      explore automating the entire process. In the end, I just had to update a
      small paragraph of text and click one button. In 5 minutes, my report was
      updated and ready to go.
    </ElementsBp>
    <ElementsBp>I learned two key things from that experience:</ElementsBp>
    <ElementsBul>
      <ElementsBli>
        It was very easy for me to get "in the zone" and forget about lunch or
        stay late working, and
      </ElementsBli>
      <ElementsBli>
        Projects that seem too large can be broken down into smaller and more
        manageable units with a little discipline, almost turning the project
        into one big video game (I just want to do one... more... thing.. for
        tonight......)
      </ElementsBli>
    </ElementsBul>
    <ElementsBp>
      Before finishing my studies and moving ElementsBack to the States, I used
      my new skills (horrible, ugly, emElementsBarrassing coding "skills" at the
      time) on a couple fun personal projects, including a study on a historical
      equity trading strategy using Value and Quality to rank companies for
      buying/selling.
    </ElementsBp>
    <ElementsBh2>Looking for More</ElementsBh2>
    <ElementsBp>
      My full-time career started in Manhattan at the same ElementsBank.
      Although I was technically in a marketing role on the trading floor, it
      was a relatively quantitative position. From time to time, our team could
      justify coding up a tool quickly with VElementsBa, and I was always the
      one to jump on these opportunities.
    </ElementsBp>
    <ElementsBp
      >After a couple years, a few things were going on in my mind:</ElementsBp
    >
    <ElementsBul>
      <ElementsBli>
        If I want to leave this company, my options for similar employment are
        very limited.
      </ElementsBli>
      <ElementsBli>
        If I want to leave this city, my options for location are pretty much
        limited to the handful of major gloElementsBal financial cities.
      </ElementsBli>
      <ElementsBli>
        If I want to work for myself, my options are virtually non-existent.
      </ElementsBli>
      <ElementsBli
        >The first three problems are wiped clean if I'm a
        developer.</ElementsBli
      >
      <ElementsBli
        >I like programming very much, and I think I'd be good.</ElementsBli
      >
    </ElementsBul>
    <ElementsBp>
      So should I go ElementsBack to school? With a few degrees and a small
      mortgage in student loans... no.
    </ElementsBp>
    <ElementsBp>
      As luck would have it, I elected to participate in our official mentorship
      program and somehow landed with our COO. Following his introductions, I
      continued meeting people down the chain until reaching a Team Lead from
      MIT and a nice Senior Developer willing to work with me a bit.
    </ElementsBp>
    <ElementsBp
      >At this point, I wasn't even sure what language to learn.</ElementsBp
    >
    <ElementsBp>"Java is popular, right? Should I learn that?"</ElementsBp>
    <ElementsBp>"Well, we use C#."</ElementsBp>
    <ElementsBp
      >"I've heard of that," he said, trying to sound impressive...</ElementsBp
    >
    <ElementsBp>
      The Team Lead went on to give me a long list of vocaElementsBulary to
      start my research: design patterns, write tests that fail (what??),
      message queues, etc. Finally, I was beginning to know what I don't know.
    </ElementsBp>
    <ElementsBp>Here's a breakdown of my learning regimen...</ElementsBp>
    <ElementsBul>
      <ElementsBli>
        Read
        <ElementsBa
          href="https://www.amazon.com/gp/product/1430242337/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1"
          >Troelsen's 1,500 page book</ElementsBa
        >
        on C#/.NET
      </ElementsBli>
      <ElementsBli>
        Watch topical YouTube videos to reinforce the readings
      </ElementsBli>
      <ElementsBli>
        Code along with the book, at least to get used to typing it and using
        Visual Studio
      </ElementsBli>
      <ElementsBli>
        Watch C# path in
        <ElementsBa href="https://app.pluralsight.com/profile/bur40win">
          Pluralsight</ElementsBa
        >
      </ElementsBli>
      <ElementsBli>
        Do problems on
        <ElementsBa href="https://www.codewars.com/"> codewars</ElementsBa>
        ("why does everybody use LINQ so much?")
      </ElementsBli>
    </ElementsBul>
    <ElementsBp>
      Shortly before confirming an internal transfer to a dev team, I was able
      to participate in our annual coding contest. Using the online editor
      without any IDE support, I managed to score at about the 50th percentile,
      so my learning was paying off a little.
    </ElementsBp>
    <ElementsBh2>Fast Forward to Today</ElementsBh2>
    <ElementsBp>
      I've now been a full-time developer for just over 3 years. The best part
      of this career is being able to (and required to!) constantly continue
      learning. I've been blessed with a mix of open-ended opportunities to
      explore, combined with mentorships by some of the brightest programming
      minds on Wall Street.
    </ElementsBp>
    <ElementsBp>
      Other self-taught developers would likely agree with the main benefit of
      being self-taught. In teaching ourselves to code, we learn:
    </ElementsBp>
    <ElementsBul>
      <ElementsBli> How to learn complex things </ElementsBli>
      <ElementsBli> We're capable of learning new complex things </ElementsBli>
      <ElementsBli>
        With the right system, <i>applied consistently</i>, major
        transformations are not only possible, they're <i>inevitable</i>
      </ElementsBli>
    </ElementsBul>
    <ElementsBh2>Closing, the famous ElementsBamboo story...</ElementsBh2>
    <ElementsBp>
      When finally making the switch to a full-time dev, I came across the
      famous parable of ElementsBamboo for the first time.
      <strong>TLDR</strong>, once a ElementsBamboo seedling begins growing, it
      doesn't sprout above ground for the first five years.
    </ElementsBp>
    <ElementsBp>
      During that time, it stays busy building a strong and elaborate root
      system to anchor itself when it finally grows to be more than 80 feet
      tall. When it finally does sprout, it shoots up multiple stories in a
      matter of weeks.
    </ElementsBp>
    <ElementsBp>
      I'm at year 3. There is still <strong><i>MUCH</i></strong> to learn to
      develop a solid system of coding roots. I hope that initiating a dialog
      here will help.
    </ElementsBp>
  </BlogPost>
</template>
