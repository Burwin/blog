---
date: 2026-07-29
title: Constitution
excerpt: Since we're building software for users, and users don't care what the code looks like as long as it behaves as expected, our main concern should be clarifying and ensuring those expectations
---

How can I make sure the software behaves as expected if I'm not sure what the expectations are?

How can I make sure that I don't break expectations when making future changes if I don't track how the expectations themselves would change for a new feature?

How can I ensure that I have valid automated tests for each critical user expectation of my software?

How can I do all this, while reducing friction as much as possible for the humans that are ultimately responsible for reviewing and signing off on the official expectations?

Some thoughts:

1. I should be able to find all critical expectations in a central place
2. Expectations (I'm going to start calling them rules going forward) should be simply stated
3. Each rule should be immutable
4. If we need to tweak a rule, we cancel the old and create a new
5. Each rule has a unique monotically increasing ID (could be namespaced per module) to make referencing it easier

So now when we want to add a new feature or change something, the iterative loop for humans (especially business domain experts) is about as tight and clear as can be. It looks something like this:

1. Describe in normal words what we want the new feature to be like
2. Generate changes to the rules file and diff it
3. Show the diff to the person making the decision to make sure everybody is on the same page about what the change means
4. Commit the changes when satisfied
5. Make sure every active rule has a corresponding automated test (mutate the tests to verify validity)
6. Let your AI system run wild implementing the new feature, making sure that all rule tests pass when finished

AI needs clear boundaries, but I don't care what the code looks like so I don't want to answer a bunch of detailed internal technical questions about how it goes about solving the problems that matter, which are the rules themselves. If we have confidence in the rules, and we have confidence that the software satisfies those rules (via valid tests), then we can trust the software.

If the rules are hard to read, we lose trust that the rules themselves are valid.

If the rule changes are hard to understand, then we lose trust in the rules.

If the tests covering the rules aren't challenged with mutation testing techniques (and other approaches), then we lost trust in the software implementing the rules reliably.

But if we want to maximize TRUST, then we need simple rules that are easy enough to reason about, which are covered by valid tests.

Then, if the users come back and say "this isn't working as expected", that means we need to add some clarity to the rules and refine things over time, always benefitting from a growing suite of guardrails.
