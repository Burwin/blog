<!-- GENERATED FROM content/posts/constitution-example.md — DO NOT EDIT -->
<script setup lang="ts">
import { addHours } from 'date-fns';
const post = {
  date: "2026-07-30",
  title: "Constitution (with example)",
  excerpt: "Concrete examples are better than chaotic theory...",
};
</script>

<template>
  <BlogPost
    :date="addHours(new Date(post.date), 12)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBp>Here's an example of what my &quot;constitution&quot; definition might look like.</ElementsBp><ElementsBh2>Conventions</ElementsBh2><ElementsBol><ElementsBli>Rules are immutable.</ElementsBli><ElementsBli>Rules are written in an <ElementsBa href="https://en.wikipedia.org/wiki/Easy_Approach_to_Requirements_Syntax">EARS</ElementsBa>-like style.</ElementsBli><ElementsBli>IDs are never reused.</ElementsBli><ElementsBli>IDs use a short section prefix + sequential number.</ElementsBli><ElementsBli>To change a rule (since it's idempotent): prepend it with <code>[REPLACED_BY: &lt;new-id&gt;]</code> and prepend the new one with <code>[REPLACES: &lt;old-id&gt;]</code></ElementsBli><ElementsBli>To cancel a rule: prepend with <code>[CANCELLED]</code></ElementsBli><ElementsBli>To add a rule: increment the ID for the given section</ElementsBli></ElementsBol><ElementsBh2>Example</ElementsBh2><pre class="bg-gray-100 p-4 overflow-auto"><code>
    ## Authentication

    AUTH-1: WHEN a user submits valid credentials, the system shall redirect them to the dashboard.
    AUTH-2: WHEN a user submits invalid credentials, the system shall display the message “Invalid email or password.”

    ## Reporting

    REP-1: The system shall generate the monthly summary report in under 3 seconds for datasets up to 50,000 rows.
    REP-2 [REPLACED_BY: REP-3]: The export button shall produce a CSV file.
    REP-3 [REPLACES: REP-2]: The export button shall produce an Excel (.xlsx) file.
    </code></pre><ElementsBp>Thoughts?</ElementsBp>
  </BlogPost>
</template>
