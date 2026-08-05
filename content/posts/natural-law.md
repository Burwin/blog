---
date: 2026-08-05
title: Natural Law vs. Constitution vs. Legislation vs. Case Law vs. Regulations
excerpt: Am I overcomplicating this?
---

I've been calling this thought process of mine - for defining specs for software and letting the AI do whatever it wants as long as those defined specs are enforced - as _constitution_. Stuck in this law framework, I wonder if all criteria make sense to be in the application's _constitution_, or should there be different layers with different properties?

Where do we put rules defining code quality expectations? Users don't care about these, but they're important to stakeholders maintaining the codebase (and indirectly to customers, of course). Are these _regulations_ (down the chain) or _natural law_ (up the chain)?

_Natural law_ should be those rules that are immutable. They're ingrained. Murder is bad. Men are not women. What does it mean for software? Maybe this is the layer of the software factory itself... the built-in algorithms that are hardcoded into the factory, providing the water in which all our agents unknowingly swim while doing their work.

Maybe it doesn't make sense in most cases to add the complexity of a separate _constitution_ from _legislation_. But in the case where it does make sense, I guess the factory (or the constitution itself) should make it a lot harder to mutate the consititution than legislation, or at least have legislation sit at a layer subsidiary to the rules in the consitutitional layer.

See? Overcomplicating, right?

No clue how _case law_ applies here, but I wrote it down, anyway. I suppose this is just repo convention and/or maybe some suggestions in the AGENTS.md files or whatever.

The entire purpose of this is to make things transparent to the users and primary stakeholders, but mostly the users. But there are other types of constraints that are important to track, especially technical constraints that matter to the engineers. Maybe these go in the _regulations_ category. Or maybe they get a piece of the _legislation_. These are things like "integration tests should finish in under 5 minutes on CI", which is only important to the engineering team.

Lots of thoughts. Gradually moving toward clarity. Thanks for reading (you're the one!).
