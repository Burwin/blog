<script setup lang="ts">
const post = {
  date: "2022-06-10",
  title: "HallPass.dev: Consuming Rate-Limited APIs More Easily",
  excerpt:
    "HallPass is a .NET library in pre-release status that allows developers calling rate-limited APIs to easily respect those API rate limits within a single instance, and using the basic Token Bucket algorithm. Ease of use is the most important motivation behind HallPass, even more so than pristine accuracy.",
};

const hp1 = `using HallPass;

builder.Services.AddHallpass(config =>
{
    config.UseTokenBucket(
        uriPattern: "api.foo.com/users",
        requestsPerPeriod: 100,
        periodDuration: TimeSpan.FromMinutes(15));
});

...

HttpClient httpClient = _httpClientFactory.CreateHallPassClient();

// this will automatically wait to keep rate within 100 / 15 minutes
await httpClient.GetAsync($"https://api.foo.com/users/{userId}", token);`;

const test1 = `[Fact]
public async Task GetTicketAsync___should_work_for_multiple_threads()
{
    var timeService = new AcceleratedTimeService(200);
    var bucket = new TokenBucket(5, TimeSpan.FromMinutes(1), timeService);

    var spy = new ConcurrentBag<DateTimeOffset>();

    var ninetySecondsLater = timeService.GetNow().AddSeconds(90);

    var tasks = Enumerable
        .Range(1, 100)
        .Select(_ => Task.Run(async () =>
        {
            await bucket.GetTicketAsync();
            spy.Add(timeService.GetNow());
        }))
        .ToList();

    await Task.WhenAll(tasks);

    var requestsInTime = spy.Where(s => s <= ninetySecondsLater).ToList();
    requestsInTime.Count.ShouldBe(10);
}`;

const hpRemote = `using HallPass;

builder.Services.AddHallPass(config =>
{
    config
        .UseTokenBucket("api.foo.com/users", 100, TimeSpan.FromMinutes(15))

        // one extra line to enable the remote service
        // use the 'key' field to scope multiple instances around a shared resource
        .ForMultipleInstances("clientId", "clientSecret", key: "api.foo.com/users");
});`;
</script>

<template>
  <BlogPost
    :date="new Date(post.date)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBh2>TLDR</ElementsBh2>
    <ElementsBp>
      <span class="font-semibold">Nuget: </span>
      <ElementsBa
        href="https://www.nuget.org/packages/HallPass/"
        target="_blank"
        >https://www.nuget.org/packages/HallPass/</ElementsBa
      >
    </ElementsBp>
    <ElementsBp>
      <span class="font-semibold">GitHub: </span>
      <ElementsBa
        href="https://github.com/BambooSoftwareLLC/HallPass.NET"
        target="_blank"
        >https://github.com/BambooSoftwareLLC/HallPass.NET</ElementsBa
      >
    </ElementsBp>
    <ElementsBp>
      <span class="font-semibold">Web: </span>
      <ElementsBa href="https://hallpass.dev/" target="_blank"
        >https://hallpass.dev/</ElementsBa
      >
    </ElementsBp>
    <ElementsBh2>Background</ElementsBh2>
    <ElementsBp>
      A while back, a client wanted to create a monthly report from data in
      their Shopify store. They had tons of products, and getting the data
      required calling a couple different Shopify endpoints repeatedly. Easy to
      write, except Shopify also rate-limits their API (as all real APIs do), so
      I couldn't just blast the endpoints all at once (or in rapid succession)
      and expect good results.
    </ElementsBp>
    <ElementsBp>
      I retrofitted some code to mostly help me respect the rate limits, but it
      was never a great solution. Also annoying to write, and also still
      wouldn't let me scale out the solution horizontally. The solution was
      implemented with Google Cloud Functions, and it would have been great to
      launch multiple functions at once to crunch through the data, but then
      they'd all need to talk to each other to make sure they all respected the
      same rate limit.
    </ElementsBp>
    <ElementsBp>
      There are bits and pieces of libraries and services that can help with
      these issues across various platforms. Istio
      <ElementsBa
        href="https://istio.io/latest/docs/tasks/policy-enforcement/rate-limit/"
        target="_blank"
        >might have something</ElementsBa
      >
      with their service mesh stuff, but if you can figure out how to use it,
      you're one of the smartest people I know. Polly
      <ElementsBa
        href="https://github.com/App-vNext/Polly/wiki/Rate-Limit"
        target="_blank"
        >has a Rate Limit policy</ElementsBa
      >
      available, but it uses a specific algorithm, is actually designed for the
      server side (not the client side), and can't support coordinating multiple
      instances (since it's a library run locally). On the JS side,
      <ElementsBa
        href="https://www.npmjs.com/package/bottleneck"
        target="_blank"
      ></ElementsBa>
      bottleneck seems incredibly popular with over 1.4M weekly downloads, but
      it hasn't been updated in 3 years, and requires you to setup and manage
      your own Redis/cache layer in order to coordinate multiple instances.
    </ElementsBp>
    <ElementsBp>
      Basically, nothing I found seemed very easy to configure and use for my
      dumb brain.
    </ElementsBp>
    <ElementsBp>
      I'm going on a journey now to see if I can help solve some of these
      challenges with HallPass.
    </ElementsBp>
    <ElementsBh2>What is a Rate Limit?</ElementsBh2>
    <ElementsBp>
      If you're not a developer,
      <span class="line-through">I'm surprised you're reading this</span> allow
      me to briefly explain what a rate limit is.
    </ElementsBp>
    <ElementsBp>
      Actually, I can't explain it any better than
      <ElementsBa
        href="https://www.tibco.com/reference-center/what-is-rate-limiting"
        target="_blank"
        >this link</ElementsBa
      >
      does.
    </ElementsBp>
    <ElementsBh2>What is HallPass?</ElementsBh2>
    <ElementsBh3>Right now...</ElementsBh3>
    <ElementsBp>
      Right now, HallPass is
      <ElementsBa
        href="https://www.nuget.org/packages/HallPass/"
        target="_blank"
        >a .NET library</ElementsBa
      >
      in pre-release status that allows developers calling rate-limited APIs to
      <span class="italic">easily</span> respect those API rate limits
      <span class="italic">within a single instance</span>, and using the basic
      Token Bucket algorithm. <span class="font-semibold">Ease of use</span> is
      the most important motivation behind HallPass, even more so than pristine
      accuracy.
    </ElementsBp>
    <ElementsBquote name="Example: .NET 6 Configuration and Usage">
      <ElementsBcode :code="hp1" />
    </ElementsBquote>
    <ElementsBh4>Native HttpClient</ElementsBh4>
    <ElementsBp>
      What's easier than using the same <code>HttpClient</code> that we already
      use in .NET?
    </ElementsBp>
    <ElementsBp>
      (Shoutout to Jarrod for the insight.. let me know if you want your last
      name mentioned)
    </ElementsBp>
    <ElementsBp>
      I want HallPass to be as unobtrusive as possible. After a simple
      configuration, it should <span class="italic">just work</span> (whatever
      that means). For .NET, I think this is pretty close to the ideal look.
    </ElementsBp>
    <ElementsBp>
      When branching out to other languages (NodeJS/TypeScript is high on the
      list of priorities), I'll try to keep the configuration and usage as
      <span class="italic">native-feeling</span> as I can, as well. Since JS
      devs use many different HTTP clients, I figure I'll need to provide some
      easy hooks for some of the more popular ones (axios for sure).
    </ElementsBp>
    <ElementsBp>
      Anyway, the other nice thing about hooking into .NET's native
      <code>HttpClient</code>
      is that we can still transparently use other great libraries (<ElementsBa
        href="https://www.nuget.org/packages/Polly/"
        target="_blank"
        >like Polly</ElementsBa
      >
      ) for things like automatic retries.
    </ElementsBp>
    <ElementsBp>
      Also, most third-party HTTP clients in .NET - like
      <ElementsBa href="https://restsharp.dev/" target="_blank"
        >RestSharp</ElementsBa
      >
      - are switching over to using .NET's native <code>HttpClient</code> under
      the hood, so HallPass should (not tested!) be compatible with those, as
      well.
    </ElementsBp>
    <ElementsBh4>Thread-safe</ElementsBh4>
    <ElementsBp>
      As of now,
      <ElementsBa
        href="https://github.com/BambooSoftwareLLC/HallPass.NET"
        target="_blank"
        >HallPass.NET</ElementsBa
      >
      is built assuming that developers are working purely in async/await flows.
      If you're calling an external API from .NET code, it would be very rare to
      do so via synchronous code.
    </ElementsBp>
    <ElementsBp>
      To that end, we only have async versions of methods. Also, it's built from
      the start to assume that it will have multiple threads interacting with
      it, so that it needs to be thread-safe all the way through.
    </ElementsBp>
    <ElementsBp>
      Given it's a pre-release, I'm still writing tests to make sure this claim
      holds up, but so far it looks pretty good. Also, all of the SDK's (for
      .NET, JS (soon), and other languages) will be open-source... so hopefully
      we can get some good feedback to fix any holes I undoubtedly will miss.
    </ElementsBp>
    <ElementsBp> As an example, here's one of my tests: </ElementsBp>
    <ElementsBquote
      name="Testing multiple-threads. AcceleratedTimeService just makes the test run 200 times faster than real time."
    >
      <ElementsBcode :code="test1" />
    </ElementsBquote>
    <ElementsBh3>Soon...</ElementsBh3>
    <ElementsBp>
      HallPass will soon enable developers to easily respect API rate limits,
      <span class="italic"
        >even if their calling clients are distributed horizontally across
        multiple instances</span
      >. For example:
    </ElementsBp>
    <ElementsBp>
      Suppose you have a service implemented as a serverless function, which
      could easily spin up multiple instances at the same time. And suppose this
      function calls a rate-limited API. How can you ensure that you easily
      respect this rate limit, shared across all of your function instances? You
      could spin up your own DB or cache layer and figure out how to implement a
      fault-tolerant and concurrent rate-limit strategy yourself. But that's
      hard. Remember, HallPass wants to make this all to be
      <span class="italic">easy</span>.
    </ElementsBp>
    <ElementsBp>
      Or suppose you have an application implemented with micro-services, and
      some of these micro-services call a rate-limited API. They also need to
      share rate-limit consumption information amongst each other in a robust
      and performant manner.
    </ElementsBp>
    <ElementsBp>
      To accomplish this, HallPass plans to offer a remote service from which
      calling clients can request chunks of
      <span class="italic">hall passes</span>, which are then used by the SDK
      library to get <span class="italic">local permission</span> to call the
      rate-limited APIs in question.
    </ElementsBp>
    <ElementsBp>
      Though there will be a REST API, I'm hoping that the SDK itself is still
      the preferred way to use the remote service. Here's an example of how that
      would look:
    </ElementsBp>
    <ElementsBquote
      name="Connecting to HallPass Remote takes just one more small line of code."
    >
      <ElementsBcode :code="hpRemote" />
    </ElementsBquote>
    <ElementsBh3>Eventually...</ElementsBh3>
    <ElementsBul>
      <ElementsBli
        ><span class="font-semibold">More languages: </span
        >JavaScript/TypeScript, Python, Java, Go ...</ElementsBli
      >
      <ElementsBli
        ><span class="font-semibold">More rate limit algorithms: </span>Leaky
        Bucket, Sliding Window, Fixed Window ...</ElementsBli
      >
      <ElementsBli
        ><span class="font-semibold">Composable rate limits: </span>"global
        limit of 100/min + endpoint specific limit of 30/sec"</ElementsBli
      >
      <ElementsBli
        ><span class="font-semibold">Easier configuration</span></ElementsBli
      >
      <ElementsBli
        ><span class="font-semibold">Better performance: </span>more accuracy,
        less resource consumption, higher throughput ...</ElementsBli
      >
      <ElementsBli
        ><span class="font-semibold">Better cloud integrations: </span>"deploy
        to AWS in zone us-east-1"</ElementsBli
      >
      <ElementsBli
        ><span class="font-semibold">More deployment methods: </span>dedicated
        cloud hosting, custom configurations for on-prem / hybrid clouds,
        etc.</ElementsBli
      >
    </ElementsBul>
    <ElementsBh2>How Does it Work?</ElementsBh2>
    <ElementsBp>
      For full details,
      <ElementsBa
        href="https://github.com/BambooSoftwareLLC/HallPass.NET"
        target="_blank"
        >check out the source code</ElementsBa
      >.
    </ElementsBp>
    <ElementsBp>
      <span class="font-semibold">TLDR: </span>Each rate limit has a bucket.
      When we make an HTTP request using the HallPass <code>HttpClient</code>,
      the request has to pass the HallPass <code>DelegateHandler</code> before
      proceeding to the actual request. The <code>DelegateHandler</code> checks
      if the request should be rate limited. If so, it finds the corresponding
      bucket and asks it for a <span class="italic">hall pass</span>, waiting
      until it gets one. Once it has a <span class="italic">hall pass</span>, it
      proceeds to the actual HTTP request.
    </ElementsBp>
    <ElementsBh3>Local vs. Remote</ElementsBh3>
    <ElementsBp>
      The biggest difference between the Local and Remote buckets are that
      Remote buckets end up refilling their local stash of hall passes in
      batches by calling the REST API. Once it has a batch of hall passes, it
      operates essentially as a local bucket until it needs more.
    </ElementsBp>
    <ElementsBp>
      So the REST API is responsible for the following in order to coordinate
      everything appropriately:
    </ElementsBp>
    <ElementsBul>
      <ElementsBli
        >Registering individual instances using the same shared key (for
        "fairly" distributing hall passes to the various instances)</ElementsBli
      >
      <ElementsBli>Refilling the central bucket (atomically)</ElementsBli>
      <ElementsBli>Taking from the central bucket (atomically)</ElementsBli>
    </ElementsBul>
    <ElementsBp>
      To manage state, the REST API is currently using Redis in the cloud. Redis
      is fast, but it's slower than in-memory, so there's some baked-in
      complexity that I'm not yet sure how to best solve for scenarios that
      require high throughput (rate limits of 1,000 requests per second, for
      example)... but I have some ideas that I'll be testing shortly.
    </ElementsBp>
    <ElementsBh3>Fun Stuff for Programmers</ElementsBh3>
    <ElementsBp>
      One thing that was fun to implement was a
      <ElementsBa
        href="https://github.com/BambooSoftwareLLC/HallPass.NET/blob/master/src/HallPass/Helpers/ConcurrentSortedStack.cs"
        target="_blank"
        ><code>ConcurrentSortedStack&lt;T&gt;</code></ElementsBa
      >. I (think I) needed this for the <code>RemoteTokenBucket</code>, because
      it's possible that different threads ask for refills from the remote
      service at the same time, and each get back hall passes with different
      valid windows that are not in order.
    </ElementsBp>
    <ElementsBp>
      For example, let's say threads A and B ask for refills. A gets theirs
      first on the API server, but B's come back to the client code first, and
      B's hall passes have <code>ValidFrom</code> times that are later than A's.
      If I use a normal <code>ConcurrentQueue</code>, I would add B's first and
      start grabbing them FIFO-style. I would need to wait until they became
      valid before proceeding, though. Eventually, I would get through the B
      tickets, and then start pulling the A tickets. But the A tickets would be
      expired by this point, so that refill was worthless.
    </ElementsBp>
    <ElementsBp>
      If instead of a normal FIFO queue, I had a list sorted by
      <code>ValidFrom</code> times, then I would be assured that I'm using as
      much of the requested hall passes as possible.
    </ElementsBp>
    <ElementsBp>
      To implement the <code>ConcurrentSortedStack</code>, I ended up using a
      <code>LinkedList</code> under the hood rather than a tree or other
      structure, because I wanted to optimize these two points:
    </ElementsBp>
    <ElementsBul>
      <ElementsBli>Removals, specifically from the top</ElementsBli>
      <ElementsBli>Insertions of groups</ElementsBli>
    </ElementsBul>
    <ElementsBp>
      The most common operation would be plucking items from the top of the
      stack, so that needed to be the greatest priority. A
      <code>LinkedList</code> in .NET offers removal from the front or back at
      <code>O(1)</code>.
    </ElementsBp>
    <ElementsBp>
      For insertions, I could optimize my custom structure a bit better than the
      worst case for a sorted <code>LinkedList</code> of
      <code>O(n)</code> because I would generally be inserting groups at a time
      (actually, at its worst case, inserting groups would be
      <code>O(n*m)</code>, where m is the size of the group of new items to be
      inserted). That means that I could do the following:
    </ElementsBp>
    <ElementsBul>
      <ElementsBli>Sort the input group first</ElementsBli>
      <ElementsBli
        >Insert the first item from the new sorted group, starting from the
        front,
        <span class="italic"
          >and remember the node that it was inserted before</span
        ></ElementsBli
      >
      <ElementsBli
        >Insert the next item starting from the last insertion point, knowing
        that it must be greater than or equal to the first item</ElementsBli
      >
      <ElementsBli>Repeat until all items are inserted</ElementsBli>
    </ElementsBul>
    <ElementsBp>
      This should bring the efficiency back down to
      <code>O(n) + O(log m)</code>, assuming .NET sorts arrays at
      <code>O(log m)</code>.
    </ElementsBp>
    <ElementsBp>
      But practically speaking, I expect the efficiency to often be
      <code>O(log m)</code>
      thanks to .NET's LinkedList also keeping a reference to the last item.
      Since each new group being inserted will likely belong after the last
      item, I can check that first before starting item-by-item from the start
      of the list. So then I only pay for the sorting of the new group.
    </ElementsBp>
    <ElementsBh2>What Now?</ElementsBh2>
    <ElementsBp>
      I'm looking for feedback, testers, and contributors. Reach out if you have
      interest.
    </ElementsBp>
  </BlogPost>
</template>
