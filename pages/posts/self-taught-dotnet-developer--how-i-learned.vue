<script setup lang="ts">
const post = {
  date: "2020-03-19",
  title: "Self-Taught .NET Developer: How I Learned",
  excerpt:
    "Books and videos for the fundamentals, and then a lot of practice on substantial projects.",
};
</script>

<template>
  <BlogPost
    :date="new Date(post.date)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBh2>Early stage</ElementsBh2>
    <ElementsBh3>Books</ElementsBh3>
    <ElementsBh4
      ><ElementsBa href="https://amzn.to/2Q5Hs2j" target="_blank"
        >Pro C# 8</ElementsBa
      ></ElementsBh4
    >
    <ElementsBp>
      I actually read the version for C# 5, but this is the latest one I found
      on Amazon. It's more than 1,500 pages long. My pace was around 30 pages
      per evening after work, which worked out to about a chapter per night.
    </ElementsBp>
    <ElementsBp>
      If I started to get sleepy, I let myself sleep. When I'm learning new
      things, I often get sleepy. My theory is that my brain is working extra
      hard and needs to rest to crystalize the new knowledge.
    </ElementsBp>
    <ElementsBp>
      I knew that I would neither understand nor remember everything I read.
      This was simply to provide a broad overview... at least after the initial
      chapters on the core of the language, which I did need to learn. In the
      future, I expected that I would either:
    </ElementsBp>
    <ElementsBul>
      <ElementsBli>
        Remember that such-and-such thing existed, and look for more details to
        actually use the feature, or
      </ElementsBli>
      <ElementsBli>
        Be able to learn the forgotten feature more easily the second time
        around after priming my mind initially
      </ElementsBli>
    </ElementsBul>
    <ElementsBp> I think both cases happened in actuality. </ElementsBp>
    <ElementsBh4>
      <ElementsBa href="https://amzn.to/2IHNqST" target="_blank"
        >Effective C#</ElementsBa
      ></ElementsBh4
    >
    <ElementsBp>
      I learned a lot about how to write clean C#. Each "Item" is a couple pages
      long and covers an important lesson/guideline/rule. The chapters are the
      following:
    </ElementsBp>
    <ElementsBul>
      <ElementsBli>C# Language Idioms</ElementsBli>
      <ElementsBli>.NET Resource Management</ElementsBli>
      <ElementsBli>Expressing Designs in C#</ElementsBli>
      <ElementsBli>Working with the Framework</ElementsBli>
      <ElementsBli>Dynamic Programming in C#</ElementsBli>
      <ElementsBli>Miscellaneous</ElementsBli>
    </ElementsBul>
    <ElementsBp> Some of the Items include: </ElementsBp>
    <ElementsBul>
      <ElementsBli
        >Use Properties Instead of Accessible Data Members</ElementsBli
      >
      <ElementsBli>Prefer Query Syntax to Loops</ElementsBli>
      <ElementsBli
        >Distinguish Between Value Types and Reference Types</ElementsBli
      >
      <ElementsBli>Limit Visibility of Your Types</ElementsBli>
      <ElementsBli>Avoid ICloneable</ElementsBli>
      <ElementsBli>and more...</ElementsBli>
    </ElementsBul>
    <ElementsBp>
      I feel like it definitely provided some solid foundations at the beginning
      of my C# learning to keep me from developing bad habits early on.
    </ElementsBp>
    <ElementsBh3>Videos</ElementsBh3>
    <ElementsBp>
      While reading those two books, I tried to line up videos as much as
      possible, as well.
    </ElementsBp>
    <ElementsBp>
      One of my early sources for video content was Bob Tabor's
      LearnVisualStudio.net (now just
      <ElementsBa href="https://bobtabor.com/" target="_blank"
        >https://bobtabor.com/</ElementsBa
      >). The progression in his videos largely lined up with the progression in
      <ElementsBa href="https://amzn.to/2Q5Hs2j" target="_blank"
        >Pro C# 8</ElementsBa
      >, which helped to reinforce the learning from two angles. I also liked
      that his courses included simple exercises at the end of each, allowing me
      to punch out some basic code in Visual Studio to start getting familiar
      with that.
    </ElementsBp>
    <ElementsBp>
      After finishing most of his content and spending a couple aimless weeks
      wandering around YouTube, I finally discovered the fantastically curated
      C# learning path at Pluralsight.
    </ElementsBp>
    <ElementsBp>
      The quality of the content is excellent. The user experience is fantastic.
      The guided path is intelligent and covers many important topics very well.
      I was hooked and began spending around 1-2 hours per evening going through
      course after course. They track your progress with very simple metrics,
      which almost felt like a video game to me, which kept me even more
      motivated to keep going.
    </ElementsBp>
    <ElementsBp>
      I've since gotten rid of my TV. If I want something to watch while eating
      dinner or something, I turn on a Pluralsight video and improve myself a
      tiny bit more. Since finishing the C# path, I've watched a number of other
      courses in various paths and as individual units (64 courses completed so
      far). I'm 100% convinced this has helped to dramatically ramp up my
      learning curve.
    </ElementsBp>
    <ElementsBp>
      I was very nervous before starting officially as a professional developer
      that all of my theoretical knowledge wouldn't transfer to on-the-job
      skills, but it turned out that it actually set me up on a solid foundation
      to succeed, and I had a very successful first year as a developer.
    </ElementsBp>
    <ElementsBp>
      Anyway, in order, here's what I watched from Pluralsight the first 12
      months (I think the C# path has changed since then):
    </ElementsBp>
    <ElementsBul>
      <ElementsBli>
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/c-sharp-fundamentals-with-visual-studio-2015/table-of-contents"
          target="_blank"
          >C# Fundamentals with Visual Studio 2015</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/csharp-equality-comparisons"
          target="_blank"
          >C# Equality and Comparisons</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/csharp-collections"
          target="_blank"
          >C# Collections Fundamentals</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/csharp-interfaces"
          target="_blank"
          >C# Interfaces</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/defensive-coding-csharp"
          target="_blank"
          >Defensive Coding in C#</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/csharp-best-practices-collections-generics"
          target="_blank"
          >C# Best Practices: Collections and Generics</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/csharp-events-delegates"
          target="_blank"
          >C# Events, Delegates, and Lambdas</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/practical-linq"
          target="_blank"
          >Practical LINQ</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/csharp-extension-methods"
          target="_blank"
          >C# Extension Methods</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/object-oriented-programming-fundamentals-csharp"
          target="_blank"
          >Object Oriented Programming Fundamentals in C#</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/web-api-design"
          target="_blank"
          >Web API Design</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/microservices-architecture"
          target="_blank"
          >Microservices Architecture</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/asynchronous-programming-dotnet-getting-started"
          target="_blank"
          >Getting Started with Asynchronous Programming in .NET</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/microsoft-web-technology-comparison"
          target="_blank"
          >A Comparison of Microsoft Web Technologies</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/automated-testing-fraidy-cats"
          target="_blank"
          >Automated Testing for Fraidy Cats Like Me</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/entity-framework-6-getting-started"
          target="_blank"
          >Getting Started with Entity Framework 6</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/csharp-concurrent-collections"
          target="_blank"
          >C# Concurrent Collections</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/test-first-development-1"
          target="_blank"
          >Test First Development - Part 1</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/aspnetwebapi"
          target="_blank"
          >Introduction to the ASP.NET Web API</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/iac-intro"
          target="_blank"
          >Introduction to Identity and Access Control in .NET 4.5</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/csharp-tips-traps"
          target="_blank"
          >C# Tips and Traps</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/angularjs-get-started"
          target="_blank"
          >AngularJS Get Started</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/html-fundamentals"
          target="_blank"
          >HTML Fundamentals</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/angular-big-picture"
          target="_blank"
          >AngularJS: The Big Picture</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/iac-aspnet"
          target="_blank"
          >Identity and Access Control in ASP.NET 4.5</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/building-securing-restful-api-aspdotnet"
          target="_blank"
          >Building and Securing a RESTful API for Multiple Clients in
          ASP.NET</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/css-intro"
          target="_blank"
          >Introduction to CSS</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/angularjs-fundamentals"
          target="_blank"
          >AngularJS Fundamentals</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/angularjs-services-in-depth"
          target="_blank"
          >AngularJS Services In-Depth</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/css-positioning-1834"
          target="_blank"
          >CSS Positioning</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/angular-routing-in-depth"
          target="_blank"
          >AngularJS Routing In-Depth</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/quick-start-javascript-1-1870"
          target="_blank"
          >Quickstart to JavaScript: Volume 1</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/quick-start-javascript-3-1918"
          target="_blank"
          >Quickstart to JavaScript: Volume 3</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/angularjs-ngmock-unit-testing"
          target="_blank"
          >AngularJS Unit Testing In-Depth, Using ngMock</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/angularjs-directive-fundamentals"
          target="_blank"
          >AngularJS Directives Fundamentals</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/javascript-design-patterns"
          target="_blank"
          >JavaScript Design Patterns</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/angularjs-line-of-business-applications"
          target="_blank"
          >AngularJS Line of Business Applications</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/angular-best-practices"
          target="_blank"
          >AngularJS Best Practices</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/typescript"
          target="_blank"
          >TypeScript Fundamentals</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/angular-2-first-look"
          target="_blank"
          >Angular: First Look</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/reactive-programming-rxjs-getting-started"
          target="_blank"
          >Getting Started with Reactive Programming using RxJS</ElementsBa
        >
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/typescript-in-depth"
          target="_blank"
          >TypeScript In-Depth</ElementsBa
        >
      </ElementsBli>
    </ElementsBul>
    <ElementsBh2>Beyond the Elementary Basics</ElementsBh2>
    <ElementsBh3>Books</ElementsBh3>
    <ElementsBp>
      I don't think the list below is in any particular order. I just know that
      I read these - some partly, others fully - throughout my first year on the
      job.
    </ElementsBp>
    <ElementsBh4>
      <ElementsBa href="https://amzn.to/2ILR51O" target="_blank"
        >Dependency Injection in .NET</ElementsBa
      >
    </ElementsBh4>
    <ElementsBp>
      During my first year, I led the development of my team's first Web API. It
      was a relatively new push throughout the organization, so there wasn't a
      ton of examples that I could leverage from other teams.
    </ElementsBp>
    <ElementsBp>
      After learning about unit testing, and realizing that I had no idea how to
      expect my Web API code to actually behave, I wanted to unit-test
      everything very thoroughly. Motivated by this, I quickly realized how
      using dependency injection to manage dependencies throughout the
      application would be essential for promoting testability.
    </ElementsBp>
    <ElementsBp>
      This book looked like the standard-bearer on Amazon. It turned out to be
      exactly what I needed. Going through it, combined with some pinpointed
      videos online, I was able to use good DI practices to build the API,
      helping me to reach my primary goal of straightforward testability.
    </ElementsBp>
    <ElementsBp>
      Of course, testability isn't the only reason to use DI, and the book does
      a good job of covering everything else. I won't repeat it here.
    </ElementsBp>
    <ElementsBh4>
      <ElementsBa href="https://amzn.to/38Hq9ed" target="_blank"
        >The Art of Unit Testing: with examples in C#</ElementsBa
      >
    </ElementsBh4>
    <ElementsBp>
      I had come across this book on Amazon about a month before finally
      purchasing it. Later, I stumbled upon an hour-long video on YouTube of the
      author, Roy Osherov, giving a talk at a conference on unit testing. The
      talk was fantastic, so I had to buy the book.
    </ElementsBp>
    <ElementsBp>
      As an intro to unit testing, with a good mix of philosophy and
      practicality, this book was an enjoyable read. It helped me to shift my
      mindset away from normal best practices in software development, to the
      slightly different best practices for writing good unit tests. Namely,
      repetition can be more acceptable for unit tests if it helps to make the
      test understandable.
    </ElementsBp>
    <ElementsBp>
      It also discusses how doing TDD can improve code quality by enforcing good
      patterns, gives an overview of various testing and mocking frameworks, and
      discusses different testing paradigms like TDD, ATDD, and others.
    </ElementsBp>
    <ElementsBp>
      I learned a lot, and should probably revisit it from time to time. It's a
      good intro and a solid resource.
    </ElementsBp>
    <ElementsBh4>
      <ElementsBa href="https://amzn.to/2wVItTC" target="_blank"
        >Design Patterns</ElementsBa
      >
    </ElementsBh4>
    <ElementsBp>
      At the very beginning of my journey to self-taught professional
      programmer, I interviewed a senior PM and dev at my then-employer. They
      were able to give me a fantastic breakdown of the industry, providing a
      bunch of jargon and things to look into and keep in mind. One was TDD and
      the idea of a failing test. The other was the importance of design
      patterns.
    </ElementsBp>
    <ElementsBp>
      This is the bible of design patterns, written by the Gang of Four.
      Unfortunately, I didn't get as far as I would have liked. Reading UML
      still doesn't come easy to me, and it definitely didn't at that time,
      either. I think I need a little more interactivity, which is why the
      <ElementsBa
        href="https://app.pluralsight.com/library/courses/patterns-library"
        target="_blank"
        >15+ hour course on Pluralsight</ElementsBa
      >
      covering various design patterns was much more easy for me to digest.
    </ElementsBp>
    <ElementsBp>
      Nevertheless, it got me off to a good start. Thanks to those two
      individuals, and thanks to some early education on the subject, I think I
      was able to develop some good habits when evaluating a problem. I think in
      patterns in real life, so thinking in design patterns for software
      problems just feels right to me, as well.
    </ElementsBp>
    <ElementsBp>
      This is definitely a book that I need to take a second look at.
    </ElementsBp>
    <ElementsBh4>
      <ElementsBa href="https://amzn.to/2IHs3B1" target="_blank"
        >Patterns of Enterprise Application Architecture</ElementsBa
      >
    </ElementsBh4>
    <ElementsBp>
      During this first year, I discovered and fell in love with Martin Fowler's
      work. I like the way he writes, and I like the way he thinks.
    </ElementsBp>
    <ElementsBp>
      This is one of his classic books, and it has helped me to think through
      and analyze different architectures at a couple different employers so
      far. It's best when you can speak with another developer who has spent
      time in Fowler's world, because then you have a rich vocabulary that you
      can use to discuss otherwise complex topics. I think this was one of the
      primary aims of the book (and any design pattern endeavor).
    </ElementsBp>
    <ElementsBh4>
      <ElementsBa href="https://amzn.to/2W6Y8KA" target="_blank"
        >Refactoring: Improving the Design of Existing Code</ElementsBa
      >
    </ElementsBh4>
    <ElementsBp>
      Another Fowler book, goes into detail introducing various patterns for
      making systematic refactorings, as well as the reasons why you should want
      to refactor.
    </ElementsBp>
    <ElementsBp>
      I'm amazed at how the authors could judiciously categorize so many
      different types of refactoring actions. On top of categorization, they go
      another step and explain why you'd want to do one action, or why you
      wouldn't want to, and how it interacts with other refactoring patterns.
    </ElementsBp>
    <ElementsBp>
      The intro chapters are especially insightful, because he speaks more
      freely about the way he thinks when looking at legacy code and/or
      refactoring any code, as well as how he likes to make small changes to
      code to continually make it more legible. All good ideas to keep in mind,
      and pretty cool to see a master at his craft transform a piece of mediocre
      code into something clean and buttoned up.
    </ElementsBp>
    <ElementsBh4>
      <ElementsBa href="https://amzn.to/2TKE8M2" target="_blank"
        >Pro ASP.NET Web API Security</ElementsBa
      >
    </ElementsBh4>
    <ElementsBp>
      This book was rated highly on Amazon, and I made it through about 5
      chapters. The content looks impressive when scanning the table of contents
      and the chapters themselves, but there was just something about the way
      the author writes that never seemed to flow to me. I found myself
      constantly re-reading different sentences or passages multiple times to
      understand what he was trying to say.
    </ElementsBp>
    <ElementsBp>
      The content is probably good, but the English is awkward. Maybe I'll give
      it another try eventually, but probably not.
    </ElementsBp>
    <ElementsBh3>Videos</ElementsBh3>
    <ElementsBp>
      Oddly, I spent a good amount of time watching videos on Angular, but no
      books. Also during this second year, I was working at a new company.
      During the interviews with them, they asked more standard computer science
      questions on things like algorithm efficiency (Big O Notation) and
      implementations of hash tables (dictionaries).
    </ElementsBp>
    <ElementsBp>
      Despite successfully passing the interviews and getting hired, I felt that
      I was missing some core pieces of knowledge, so that was also reflected in
      the videos watched during this time.
    </ElementsBp>
    <ElementsBp>
      Finally, near the end of my initial employer, I spent some time setting up
      the new API and Angular projects I'd created on our new CI/CD platform of
      TeamCity and Octopus. For this, I ended up using a decent amount of
      Powershell, so I thought I might need to get some more familiarity with
      it.
    </ElementsBp>
    <ElementsBp> Here's the list: </ElementsBp>
    <ElementsBul>
      <ElementsBli>
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/angular-cli"
          target="_blank"
          >Angular CLI</ElementsBa
        >
      </ElementsBli>
      <ElementsBli>
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/case-for-powershell"
          target="_blank"
          >The Case for Powershell</ElementsBa
        >
      </ElementsBli>
      <ElementsBli>
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/ads-part1"
          target="_blank"
          >Algorithms and Data Structures: Part 1</ElementsBa
        >
      </ElementsBli>
      <ElementsBli>
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/play-by-play-discovering-powershell-minasi"
          target="_blank"
          >Play by Play: Discovering PowerShell with Mark Minasi</ElementsBa
        >
      </ElementsBli>
      <ElementsBli>
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/algorithmics-introduction"
          target="_blank"
          >An Introduction to Algorithmics</ElementsBa
        >
      </ElementsBli>
      <ElementsBli>
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/html5-fundamentals"
          target="_blank"
          >HTML5 Fundamentals</ElementsBa
        >
      </ElementsBli>
      <ElementsBli>
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/angular-routing"
          target="_blank"
          >Angular Routing</ElementsBa
        >
      </ElementsBli>
      <ElementsBli>
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/ads2"
          target="_blank"
          >Algorithms and Data Structures: Part 2</ElementsBa
        >
      </ElementsBli>
      <ElementsBli>
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/csharp-tips-traps-part2"
          target="_blank"
          >C# Tips and Traps 2</ElementsBa
        >
      </ElementsBli>
      <ElementsBli>
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/patterns-library"
          target="_blank"
          >Design Patterns Library</ElementsBa
        >
      </ElementsBli>
      <ElementsBli>
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/flutter-getting-started"
          target="_blank"
          >Flutter: Getting Started</ElementsBa
        >
      </ElementsBli>
      <ElementsBli>
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/angular-fundamentals"
          target="_blank"
          >Angular Fundamentals</ElementsBa
        >
      </ElementsBli>
    </ElementsBul>
    <ElementsBh2>Discovering Domain Driven Design</ElementsBh2>
    <ElementsBp>
      My second coding employer had developed an exceptionally rich and supple
      domain model. It was mostly a joy to work with (would be more so if you
      could compare against the alternative universe of what would have been
      without the rich model), but I never knew that the principles behind it
      were a "thing". I just thought that everybody that worked there was
      insanely smart, which they were.
    </ElementsBp>
    <ElementsBp>
      At my next employer, we didn't have the luxury of a rich and supple (love
      that word) domain model... but there were aspirations to get there. On my
      team particularly, we scoped out a chunk of code that we believed could
      serve as a good starting point for Strangling the Monolith, allowing us to
      use good Domain Driven Design principles and practices to build something
      useful and easy to maintain.
    </ElementsBp>
    <ElementsBp>
      To ramp up my knowledge for the task, I read a lot of books and watched
      the majority of the Pluralsight DDD path.
    </ElementsBp>
    <ElementsBp>
      Unfortunately, that project has thus far been shelved at work. It's a big
      strategic mistake, in my opinion, but what do I know... I'm just a lowly
      developer with
      <ElementsBa
        href="https://www.essec.edu/en/news/essec-ranked-7th-top-european-business-school-ft/"
        target="_blank"
        >no significant business education</ElementsBa
      >
      at all............
    </ElementsBp>
    <ElementsBh3>Books</ElementsBh3>
    <ElementsBh4>
      <ElementsBa href="https://amzn.to/2TL1v8d" target="_blank"
        >Domain-Driven Design Distilled</ElementsBa
      >
    </ElementsBh4>
    <ElementsBp>
      Fantastic intro to the topic, written by the same author of
      <ElementsBa href="https://amzn.to/33cGjvf" target="_blank"
        >Implementing Domain-Driven Design</ElementsBa
      >
      .
    </ElementsBp>
    <ElementsBp>
      I joked with colleagues at work when they complained it was 70+ pages that
      it's a very quick read because there are a lot of pictures... which is
      true. It's an easy read, lots of diagrams, and touches on the topics
      enough for non-developers to understand pretty much everything they need
      to know about DDD. For developers, it provides us a soft intro so that
      learning the meat comes more easily in the later stages.
    </ElementsBp>
    <ElementsBh4>
      <ElementsBa href="https://amzn.to/3cWhEzi" target="_blank"
        >Domain-Driven Design</ElementsBa
      >
    </ElementsBh4>
    <ElementsBp>
      This is the reference for the subject. It's a bit more philosophically
      written than its more practical
      <ElementsBa href="https://amzn.to/33cGjvf" target="_blank"
        >Implementing Domain-Driven Design</ElementsBa
      >, but I preferred this one over the other two in this list. Maybe it
      helped that I read it last and so already had a decent grasp of the
      concepts, making it easier to go through this and appreciate the
      higher-level philosophy and principles.
    </ElementsBp>
    <ElementsBp>
      It has changed the way I look at software for the better.
    </ElementsBp>
    <ElementsBp>
      To practice, I've been working on a private project in my spare time at
      home, trying to stay as true to the principles of DDD as possible. So far,
      I love it. As complexity increases, so far my system is still very easy to
      understand and modify where needed.
    </ElementsBp>
    <ElementsBp>
      He was a big proponent of the word "supple" to describe an ideal Domain
      Model, and I'm enjoying making refactorings along the way in my own
      project to continually progress toward more "suppleness".
    </ElementsBp>
    <ElementsBh4>
      <ElementsBa href="https://amzn.to/33cGjvf" target="_blank"
        >Implementing Domain-Driven Design</ElementsBa
      >
    </ElementsBh4>
    <ElementsBp>
      I read this one after
      <ElementsBa href="https://amzn.to/2TL1v8d" target="_blank"
        >Domain-Driven Design Distilled</ElementsBa
      >, but before
      <ElementsBa href="https://amzn.to/3cWhEzi" target="_blank"
        >Domain Driven Design</ElementsBa
      >. It was pretty good, but I didn't use a number of his specific
      implementation patterns in my hobby project. Maybe that will come back to
      bite me, we'll see. I'm also lucky in that I can refer back to my previous
      employer's fantastic Domain Model and the patterns that they used for
      alternatives to those found in these books.
    </ElementsBp>
    <ElementsBp>
      Others have told me they really preferred this book over the other main
      one. The style is a bit different, so that might be a thing. Overall,
      though, it felt like the overall quality was comparable between the two.
      If you can only read one, flip a coin and you'll probably be fine... but
      why not read both?
    </ElementsBp>
    <ElementsBh3>Videos</ElementsBh3>
    <ElementsBp>
      I didn't watch the videos in the advanced section, yet. I'm mostly looking
      forward to a more in-depth look at Event Sourcing, but that one hasn't
      been posted (since I've last checked).
    </ElementsBp>
    <ElementsBp>
      I also skipped a course by Esposito or something. I'm sure it was decent,
      but I couldn't stand his voice. Nothing personal.
    </ElementsBp>
    <ElementsBul>
      <ElementsBli>
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/clean-architecture-patterns-practices-principles"
          target="_blank"
          >Clean Architecture: Patterns, Practices, and Principles</ElementsBa
        >
      </ElementsBli>
      <ElementsBli>
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/domain-driven-design-fundamentals"
          target="_blank"
          >Domain-Driven Design Fundamentals</ElementsBa
        >
      </ElementsBli>
      <ElementsBli>
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/domain-driven-design-in-practice"
          target="_blank"
          >Domain-Driven Design In Practice</ElementsBa
        >
      </ElementsBli>
      <ElementsBli>
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/refactoring-anemic-domain-model"
          target="_blank"
          >Refactoring from Anemic Domain Model Towards a Rich One</ElementsBa
        >
      </ElementsBli>
      <ElementsBli>
        <ElementsBa
          href="https://app.pluralsight.com/library/courses/csharp-specification-pattern"
          target="_blank"
          >Specification Pattern in C#</ElementsBa
        >
      </ElementsBli>
    </ElementsBul>
    <ElementsBh2>Connecting the Dots</ElementsBh2>
    <ElementsBp>
      The next step in my development is being able to tie the pieces all
      together into a cohesive software system - deployed and usable. Shipping
      software involves more than just writing beautiful code and committing it
      to the cloud somewhere. Databases need provisioned. CI/CD pipelines need
      setup. Authentication needs configured. Code needs deployed. Etc.
    </ElementsBp>
    <ElementsBp>
      The only way to do that is to work on real projects from start to finish.
      Work provides some of these opportunities, but it's difficult to cover all
      the bases in our silo'd teams and on complex projects, most of which are
      likely legacy and already have a number of infrastructural pieces long
      established.
    </ElementsBp>
    <ElementsBp>
      Also, I really don't have any direct mobile UI experience, so some of the
      projects in my queue are chosen specifically to get that covered.
    </ElementsBp>
    <ElementsBp>
      Finally, another goal of this stage is to use implicit peer pressure to
      force me to lift my coding standards. With open-source projects, I'm
      displaying my code for all to see (and criticize). With deployable apps
      and open-source projects, I'm displaying my finished products for all to
      see (and criticize). With blogging, I'm displaying my thoughts and dreams
      for all to see (and criticize).
    </ElementsBp>
    <ElementsBp>
      The criticism will hurt. So the threat of criticism provides additional
      motivation to go the extra mile, to stretch myself. And of course, the
      actual criticism will (hopefully) teach me new ways to do/see/think about
      things.
    </ElementsBp>
    <ElementsBp> It's all a giant intense learning experience! </ElementsBp>
    <ElementsBh3>Projects</ElementsBh3>
    <ElementsBh4>Super Secret App</ElementsBh4>
    <ElementsBp>
      This is my main baby, but I think it might actually have commercial value
      when it's finished... so I can't talk about it too much.
    </ElementsBp>
    <ElementsBp>
      But it has a ton of cool technical stuff in it for me to learn, including:
    </ElementsBp>
    <ElementsBul>
      <ElementsBli>Domain Driven Design</ElementsBli>
      <ElementsBli>Message-based asynchronous architecture</ElementsBli>
      <ElementsBli>Event sourcing</ElementsBli>
      <ElementsBli>Cloud hosting</ElementsBli>
      <ElementsBli>Mobile development</ElementsBli>
      <ElementsBli>End-to-end web development</ElementsBli>
      <ElementsBli
        >Public API built for integrations with third-parties</ElementsBli
      >
      <ElementsBli>Modern Authentication</ElementsBli>
      <ElementsBli>Individual user accounts</ElementsBli>
      <ElementsBli>Field level encryption</ElementsBli>
      <ElementsBli>and more...</ElementsBli>
    </ElementsBul>
    <ElementsBh4>JsonCryption</ElementsBh4>
    <ElementsBp>
      This small project spun off from the one above. I needed to modify my JSON
      serializer to use with Marten so that I could easily encrypt different
      fields of my C# objects with a straightforward API. MongoDB has a similar
      feature, but it requires using MongoDB. I'm using Marten specifically
      because I like how they handle Event Sourcing... but Marten requires using
      Postgres.
    </ElementsBp>
    <ElementsBp>
      I've already learned a ton from this short project, including:
    </ElementsBp>
    <ElementsBul>
      <ElementsBli
        >Optimizing .NET reflection with Expression trees</ElementsBli
      >
      <ElementsBli>Using GitHub Actions for CI/CD</ElementsBli>
      <ElementsBli>Publishing to NuGet in a CI/CD pipeline</ElementsBli>
      <ElementsBli>OWASP best practices for encryption</ElementsBli>
      <ElementsBli>Key Management Systems</ElementsBli>
      <ElementsBli>and more...</ElementsBli>
    </ElementsBul>
    <ElementsBh4>Todo Bubbles</ElementsBh4>
    <ElementsBp>
      Every developer needs to do their own todo list at some point, right? I
      have an idea for a slight variation on the usual todo list, making use of
      what I think is a key psychological trait in order to fill a specific
      niche.
    </ElementsBp>
    <ElementsBp>
      More details will come probably later this summer. I want to finish the
      first project before starting this one. I'm not sure if anybody else will
      find it useful, but I know I could use the specific feature set that this
      guy will provide.
    </ElementsBp>
    <ElementsBp> And all the while, I expect to learn: </ElementsBp>
    <ElementsBul>
      <ElementsBli>More mobile development</ElementsBli>
      <ElementsBli>Mobile app deployment</ElementsBli>
      <ElementsBli>Probably some fun little UI stuff</ElementsBli>
    </ElementsBul>
    <ElementsBh4>This Blog</ElementsBh4>
    <ElementsBp>
      I like to relate things to seemingly unrelated things. It helps me to
      understand both at a deeper level, I find. I'm not sure if anybody else
      will agree, or if they'll agree with the weird relationships I find with
      programming and business (religion, war, seduction...).
    </ElementsBp>
    <ElementsBp>
      But I like writing about it, if nothing more than to store my thoughts.
      Also, as many people often say, forcing ourselves to write down our
      thoughts and ideas helps us to curate and refine them.
    </ElementsBp>
    <ElementsBp>
      Writing is a skill by itself. It's useful in life to be a good writer.
      It's useful as a programmer to be a good writer. We all have complicated
      things to communicate with people we care about, about things we care
      about. I'm not a great writer, but I think I can improve, and I think it
      will improve other areas in my life - including the code I write.
    </ElementsBp>
  </BlogPost>
</template>
