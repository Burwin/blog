---
date: 2026-08-06
title: What about visual stuff?
excerpt: It makes sense to write textual specs (rules) for logical requirements, but what about visual requirements?
---

If I want to assert that my system calculates loan amortization schedules correctly, I can have a series of rules in my _constitution_ that are textual and logical and perfectly constrain the mathematical side of things.

But software doesn't just **do** things. It also **displays** stuff.

To a degree, we can describe the high-level visual requirement of some thing:

"V-14: the loan amortization results table includes columns Start, Interest, End"

But the subset of possible designs satisfying _that_ requirement is inifinite, and most of them are terrible.

## Pin UI mockups?

One technique we've found useful for significant UI work - in the context of AI generation - is to just do a bunch of quick prototype rounds, iteratively converging on a final design that's acceptable to the stakeholders.

1. Give vague requirements to AI
2. AI generates 3 prototypes and posts them somewhere for us to review
3. If we want changes, we clarify #1 and restart the loop
4. When we're satisfied, we lock in the final choice and then behavioral implementation continues from that point

It's a relatively cheap and rapid mechanism, much cheaper than implementing the full code for the feature, and stakeholders really like it because it's visual (pictures are really key for meatheads like us non-clankers).

Something like this would fit into a _constitution-centric iterative workflow_ quite naturally. Depending on how strict the implemented UI elements must match the pixels of the prototype designs, our pinning mechanism can vary how it verifies the implemented design. Maybe we just have an agent check for "looks about right based on foo-123.png". Maybe we have a full automated test that checks all pixels are in the exact right position. Maybe we check CSS classes.

I'm not a pro UI guru, so I defer to those guys on the specifics of this. What I do know, is that a good-enough system for incorporating some form of UI elements into the _constitutional_ spec-driven flow is definitely possible, and I think would even fit the spirit of being almost joyful to work with for human stakeholders.
