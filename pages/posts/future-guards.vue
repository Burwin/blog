<!-- GENERATED FROM content/posts/future-guards.md — DO NOT EDIT -->
<script setup lang="ts">
import { addHours } from 'date-fns';
const post = {
  date: "2026-07-31",
  title: "Future Guards for AI Software Factories",
  excerpt: "I'm jumping the gun here before describing the general guards for software factories, but it was a new thought on my mind so I wanted to capture it.",
};
</script>

<template>
  <BlogPost
    :date="addHours(new Date(post.date), 12)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBp>Software Factories will be engineered rigs that enable business domain experts to build software that's meaningful to them, using AI, while guarding against regressions, bugs, security holes, etc.</ElementsBp><ElementsBp>Claude Code and others attempt to do this now, but they have to be very generic to make sure that they can remain applicable to millions of different use cases. There is a lot of room, though, for highly-opinionated software factories.</ElementsBp><ElementsBp>Again, without getting into the weeds, one of the main features of a software factory is &quot;concurrent agent orchestration&quot;: multiple AI agents working together in different roles to accomplish the goals of the person directing them. But just like in human organizations, different AI roles should have least-privilege access to organizational tools and data, as well as unique capabilities and personas.</ElementsBp><ElementsBp>The current rough approach is defining these guards per agent in some configuration file, often just a markdown (plain text) file that the AI reads and might use (&quot;guidelines&quot;). All well and good, but that wouldn't cut it for human teams: &quot;just include in their job description that they must never check HR records for how much their colleagues earn... even though they physically have access to that data&quot;.</ElementsBp><ElementsBp>Oh, and these orchestration systems right now typically run agents on a single server, just different computer processes.</ElementsBp><ElementsBp>That's what will be hardened in the near future.</ElementsBp><ElementsBp>Each agent being orchestrated will run from its own computer (or virtual machine), just like a person, with its own IAM identity and corresponding RBAC privileges. Hard access rules.</ElementsBp><ElementsBp>Now we can be as granular as we want and have <em>much more</em> confidence (<strong>TRUST!!</strong>) that the our guards are not merely optional guidelines.</ElementsBp><ElementsBp>Concrete example?</ElementsBp><ElementsBp>Let's say we follow a workflow where the human stakeholders first iterate on the highest-level <em>constitutional</em> amendments to describe important software behavior. They should probably iterate with the agents having the well-defined <em>Constitutional Lawyer</em> role, which gives them access to read and write the rules and read the code, but not edit the code.</ElementsBp><ElementsBp>Then, once the amendments are ratified, the engineers will need to read the amendments (but never ever modify them in any way) to edit the code, including any tests. Maybe some roles will ONLY edit tests, and then implementation engineers will just write the code to make the tests pass. In these cases, we can manipulate the RBAC controls of each role type to give them exactly the access rights that they need, and nothing more.</ElementsBp><ElementsBp>Thoughts?</ElementsBp>
  </BlogPost>
</template>
