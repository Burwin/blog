<script setup lang="ts">
import BlogPost from "../../components/BlogPost.vue";
import { bp, ba, bquote, bh2, bul, bli } from "../../components/elements";

const post = {
  date: "2020-02-05",
  title: "Another Self-Taught Developer",
  excerpt:
    "When finally making the switch to a full-time dev, I came across the famous parable of bamboo for the first time. TLDR, once a bamboo seedling begins growing, it doesn't sprout above ground for the first five years. During that time, it stays busy building a strong and elaborate root system to anchor itself when it finally grows to be more than 80 feet tall. When it finally does sprout, it shoots up multiple stories in a matter of weeks.",
};
</script>

<template>
  <BlogPost
    :date="new Date(post.date)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <bh2> Learning how to Pronounce Integer </bh2>
    <bp>
      When I was ten years old, my dad dropped off a couple old programming
      books after one of his visits. One was an intro to C.
    </bp>
    <bp>
      At the time, I was in love with a little-known football video game that
      was decades ahead of its time in terms of off-the-field team management
      features, called Total Control Football. Gamespot says:
    </bp>
    <bquote
      quote="I'm not sure if there was a demand for it, but here it is: a football simulation for pigskin fans who love micromanagement."
      name="Gamespot"
      contextText="Total Control Football Review"
      contextUrl="https://www.gamespot.com/reviews/total-control-football-review/1900-2535192/"
    >
    </bquote>
    <bp>It was glorious. Madden is still catching up.</bp>
    <bp>
      So shortly after failing to build a flying set of glider wings out of
      sticks and duct-tape, I set out learning how to code so I could build an
      awesome game of my own...
    </bp>
    <bp>
      I don't remember much of my early reading from the book, but I remember
      generally just re-typing the example programs listed in its pages.
      Attempting to compile them taught me early on how rage-inducing a missing
      semicolon could be back then before intelligent IDEs could spot the
      obvious. The one thing I do know is that, thanks to this book, I learned
      the word integer long before finally hearing it pronounced (it's NOT a
      hard 'G').
    </bp>
    <bp>
      Over the years, I'd convince my mother and myself that what I really
      wanted for Christmas was the newest version of Visual C++, even though I
      really couldn't use it.
    </bp>
    <bh2>Discovering a Taste</bh2>
    <bp>
      In college, I was able to get a copy of SQL Server Management Studio. I'm
      not sure if I used up a Christmas or birthday gift for it, or if I was
      able to obtain an academic version through my university. With my now
      budding passion for stock options, and exposure to data mining thanks to
      an undergrad professor that let me unofficially audit his masters-level
      course on the subject, I had a grand plan to discover a money-printing
      covered call trading strategy. For a couple hundred bucks (I had a credit
      card and wasn't yet afraid of debt), I was able to purchase a few years
      worth of historical stock option market data. My goal was to load it into
      my database, clean it up, and then unleash the power of SSMS's data mining
      module to find the Holy Grail. I knew it would work, which kept the
      motivation strong. At the same time, I knew there was no chance that it
      would work, which led to my ultimate justification:
    </bp>
    <bquote
      quote="Even if it doesn't work, I'll learn a bit of SQL and how to work with a database."
      name="me"
    >
    </bquote>
    <bp>
      I took a couple programming courses in college: Intro to Java and
      Numerical Methods I/II (using Matlab). Otherwise, I wouldn't dabble in any
      coding until the end of my first internship in Paris.
    </bp>
    <bh2>Getting in the Zone</bh2>
    <bp>
      While attending business school for an MBA, I started an internship on the
      trading floor of BNP Paribas in Paris at the height (trough?) of the 2009
      financial crisis. At the end, I was out of work on my last day, so I spent
      the day building an "art macro" in Excel. It did nothing more than
      randomly cycle through colors within cells, influenced by neighboring
      cells, creating a swaying mosaic of color.
    </bp>
    <bp>
      In my next internship (now Societe Generale), I actually used my budding
      VBA skills for real work. After a month or so, I was told that I would be
      taking over the weekly responsibility of creating/updating a standard
      internal report on the Credit market for our traders. The intern passing
      off her mantel showed me all the tedious manual steps she would take to
      update it, ultimately spending around a half-day every week. There had to
      be a better way! Thankfully, my managers gave me the freedom to explore
      automating the entire process. In the end, I just had to update a small
      paragraph of text and click one button. In 5 minutes, my report was
      updated and ready to go.
    </bp>
    <bp>I learned two key things from that experience:</bp>
    <bul>
      <bli>
        It was very easy for me to get "in the zone" and forget about lunch or
        stay late working, and
      </bli>
      <bli>
        Projects that seem too large can be broken down into smaller and more
        manageable units with a little discipline, almost turning the project
        into one big video game (I just want to do one... more... thing.. for
        tonight......)
      </bli>
    </bul>
    <bp>
      Before finishing my studies and moving back to the States, I used my new
      skills (horrible, ugly, embarrassing coding "skills" at the time) on a
      couple fun personal projects, including a study on a historical equity
      trading strategy using Value and Quality to rank companies for
      buying/selling.
    </bp>
    <bh2>Looking for More</bh2>
    <bp>
      My full-time career started in Manhattan at the same bank. Although I was
      technically in a marketing role on the trading floor, it was a relatively
      quantitative position. From time to time, our team could justify coding up
      a tool quickly with VBA, and I was always the one to jump on these
      opportunities.
    </bp>
    <bp>After a couple years, a few things were going on in my mind:</bp>
    <bul>
      <bli>
        If I want to leave this company, my options for similar employment are
        very limited.
      </bli>
      <bli>
        If I want to leave this city, my options for location are pretty much
        limited to the handful of major global financial cities.
      </bli>
      <bli>
        If I want to work for myself, my options are virtually non-existent.
      </bli>
      <bli>The first three problems are wiped clean if I'm a developer.</bli>
      <bli>I like programming very much, and I think I'd be good.</bli>
    </bul>
    <bp>
      So should I go back to school? With a few degrees and a small mortgage in
      student loans... no.
    </bp>
    <bp>
      As luck would have it, I elected to participate in our official mentorship
      program and somehow landed with our COO. Following his introductions, I
      continued meeting people down the chain until reaching a Team Lead from
      MIT and a nice Senior Developer willing to work with me a bit.
    </bp>
    <bp>At this point, I wasn't even sure what language to learn.</bp>
    <bp>"Java is popular, right? Should I learn that?"</bp>
    <bp>"Well, we use C#."</bp>
    <bp>"I've heard of that," he said, trying to sound impressive...</bp>
    <bp>
      The Team Lead went on to give me a long list of vocabulary to start my
      research: design patterns, write tests that fail (what??), message queues,
      etc. Finally, I was beginning to know what I don't know.
    </bp>
    <bp>Here's a breakdown of my learning regimen...</bp>
    <bul>
      <bli>
        Read
        <ba
          href="https://www.amazon.com/gp/product/1430242337/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1"
          >Troelsen's 1,500 page book</ba
        >
        on C#/.NET
      </bli>
      <bli> Watch topical YouTube videos to reinforce the readings </bli>
      <bli>
        Code along with the book, at least to get used to typing it and using
        Visual Studio
      </bli>
      <bli>
        Watch C# path in
        <ba href="https://app.pluralsight.com/profile/bur40win">
          Pluralsight</ba
        >
      </bli>
      <bli>
        Do problems on <ba href="https://www.codewars.com/"> codewars</ba> ("why
        does everybody use LINQ so much?")
      </bli>
    </bul>
    <bp>
      Shortly before confirming an internal transfer to a dev team, I was able
      to participate in our annual coding contest. Using the online editor
      without any IDE support, I managed to score at about the 50th percentile,
      so my learning was paying off a little.
    </bp>
    <bh2>Fast Forward to Today</bh2>
    <bp>
      I've now been a full-time developer for just over 3 years. The best part
      of this career is being able to (and required to!) constantly continue
      learning. I've been blessed with a mix of open-ended opportunities to
      explore, combined with mentorships by some of the brightest programming
      minds on Wall Street.
    </bp>
    <bp>
      Other self-taught developers would likely agree with the main benefit of
      being self-taught. In teaching ourselves to code, we learn:
    </bp>
    <bul>
      <bli> How to learn complex things </bli>
      <bli> We're capable of learning new complex things </bli>
      <bli>
        With the right system, <i>applied consistently</i>, major
        transformations are not only possible, they're <i>inevitable</i>
      </bli>
    </bul>
    <bh2>Closing, the famous bamboo story...</bh2>
    <bp>
      When finally making the switch to a full-time dev, I came across the
      famous parable of bamboo for the first time. <strong>TLDR</strong>, once a
      bamboo seedling begins growing, it doesn't sprout above ground for the
      first five years.
    </bp>
    <bp>
      During that time, it stays busy building a strong and elaborate root
      system to anchor itself when it finally grows to be more than 80 feet
      tall. When it finally does sprout, it shoots up multiple stories in a
      matter of weeks.
    </bp>
    <bp>
      I'm at year 3. There is still <strong><i>MUCH</i></strong> to learn to
      develop a solid system of coding roots. I hope that initiating a dialog
      here will help.
    </bp>
  </BlogPost>
</template>
