---
date: 2026-07-23
title: Gherkinizer
excerpt: What does your codebase actually do? Gherkin makes it easier for people to review, and AI handles the workload.
---

One way to lose trust in a codebase is when you don't actually know the system's coded behavior.

THEM: "What happens if you throw a fluffle into the loraxinator?"
YOU: "I really don't know..."

When you don't know how the system is supposed to behave, it's hard to be confident when making changes to its behavior. This is one of the key benefits to automated testing when writing code by hand, which works better since you at least know that a real person wrote the initial tests, so if you break one of those, it's something you should really care about.

But if AI is doing the work, or if people that no longer exist did the work, then you have no confidence that what you're about to change is safe or not.

You could just look at the code...

Sure, but that can be quite complicated on projects of any non-trivial size. Code helps us talk to computers, but it's still a foreign language.

Gherkin was made to bridge the gap between humanity and computer specs, and it does it better than code. It's typically denser, which is also great for audit situations like what I'm trying to describe. It's much easier to audit the behavior of a system by scrolling through 2,000 Gherkin scenarios than by scrolling through 2,000 10,000 line code files.

We should have a tool that does this for us. This will be one of my earlier experiments when applying agent swarms at scale to a codebase. Something like this:

1. Review the current list of gherkin scenarios
2. Look in the codebase and try to find a new one not already covered, caring only about the actual public user interface (we don't care about internals unless they impact users)
3. If you find one, write the gherkin for it
4. Break it down into logic primitives and verify it' still not already covered
5. Convert it into an automated test, ideally e2e
6. Confirm the test passes (it's describing existing functionality, so it should pass)
7. Mutate the test a few times to make sure it's not flaky or fluky
8. Organize the gherkin scenarios so they make some sense to humans reviewing them (order, classification, grouping)
9. Repeat until satisfied that all functionality is captured

Depending on the complexity of the codebase, you'll have tens to thousands of Gherkin scenarios, somewhat well organized, ready for human review.

Now, the people that actually know how the business is supposed to function (and the business software), can more readily review the actually-implemented functionality for correctness.

"That's not right, it should be negative instead of positive".

Business logic bug squashed.

THEN, future features can always compare themselves against this human-legible list of Gherkin scenarios.

"This change calls for the following new Gherkin scenarios, which implies these existing ones need to change this way, and this subset over here should be removed entirely... business expert, do you agree?"

Once business agreement is reached, the revised Gherkin scenarios become coded as tests, which form the most rigid structure of the application, allowing all other parts, including internal unit tests and performance tests (where not also captured by Gherkin) to vary as needed, as long as the Gherkin scenarios always stay green.
