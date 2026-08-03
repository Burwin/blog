---
date: 2026-08-03
title: Separation of Powers
excerpt: Adversarial collaboration might work well for AI development when following the CONSTITUTION model
---

I've been playing around with adding a "constitution" to an existing small internal project, and I like it a lot so far! Went pretty smoothly, and simplified quite a bit in my own mind about my own software. This shows promise.

But to do it at scale, we need a system... ideally something with as much done with AI as reasonable.

What would the minimum set of roles be?

I don't like reinventing the wheel, so let's just stick to the Founding Fathers as inspiration, and land on the following for an initial attempt:

- **Legislators**: write laws (acceptance criteria)
- **Governors**: enforce laws (by writing automated tests against the laws)
- **Judges**: interpret laws (blurriest so far, but probably starts by reviewing laws and their implementations for validity and coherence)
- **Engineers**: writes code to implement laws (is this the deep state?)
