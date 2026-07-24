---
date: 2026-07-23
title: People-first AI
excerpt: AI development should be focused on reducing the most friction from the development process, which is NOT typing code
---

There are a lot of techniques for using AI to write software.

The guy from Gas City has a neat little 8-step then 11/12-step "AI evolution" or whatever diagram, showing how people progress through modes of using AI to build things. By step 8 or something, we're orchestrating multiple agents (like 10-30 at a time).

Ok, but people still have to tell our borg what to build. How does that judgement get made?

And how detailed do we have to be with what we tell our AI rigs to build? What if they build it wrong? Who decides if something is wrong, anyway?

Even with AI dramatically reducing the friction that existed before when it came to typing code, and even with knowing what code to type (researching the language syntax, libraries, and even formulating the logic), the hardest part was always determining what exactly needs to be codified. Logic is complicated. Complex systems are incredibly complicated. Blending complex logical features into existing complex logical systems is tricky. Ultimately making sure that what they human sees is what they expect is the hardest part of all.

How does AI help with that?

Natively, it really doesn't, and we can tell by how it writes.

I've often had Claude (Fable, no less!) write summaries of bugs that I'm seeing in a given codebase, but even to the business domain experts, and even after asking Claude to "write in professional 3rd grade reading level", it's still next to impossible for me to understand what's going on. I can't send that to my customers.

It's okay at building UI designs, when they're simple. But once complexity starts to creep in, it tends to produce a ball of junk.

But it's so productive when it works!

So how can we corral it so that it works more often and more reliably?

People like high level summaries that break down into greater and greater detail as needed. For high level summaries, we have some of these tools available, which AI can do moderately well with good coaching:

- Gherkinizing (specs from existing code)
- Diagrams
- Screenshots / screen recordings

There are others, but that last one is what I want to talk about now.

Even before AI, I found myself reaching a point of "I trust your code quality" of the engineers I employed, such that doing code reviews was annoying and pointless, especially if the actual feature didn't work. It's often hard to tell if code that looks good actually works well, btw.

I could (and do) enforce automated tests be included in most changes by default, and that helps, but the best way to check if something is working is still the most human way: "show me a demo"

So I told my team that I don't want to review their code anymore unless they had specific questions about it. (We still scheduled periodic code audits to make sure things were still going in the right direction). Instead, I just wanted them to record a screenshare of them walking me through the changed functionality, mostly by clicking through the working application, and optionally showing me some of the key code parts in the video, narrating as they went.

The videos of the functionality were exactly what my humanity was looking for.

It took them 2-5 minutes to record (longer if they needed to repeat the recording), and then I'd be left with a 30s to 3min video of the new feature. Very easy to review something like that.

So we've been building up a system that does this for AI work, as well.

Thankfully, Playwright (I always spell this wrong) allows automatic screen recording - headless even - of e2e tests. So now we get double benefit: e2e automated tests AND recordings from those tests demonstrating working functionality.

Similarly, when initially working on a UI feature without a design artifact already finished (the usual case), we just have AI gnerate some prototypes in iterative batches for our quick human review. So much better than waiting for it to write the entire feature, only for us to then not like it and need to rip it out and redo.

Diagrams still need refinement, but they're not bad.

That's really the gist. Humans are primarily visual. Let's make visual things for us to review, rather than making us slog through hundreds of lines of AI-generated code.

- Pictures (worth a thousand words)
- Videos (work a thousand pictures)
- Summaries
- Gherkin (lists of dense information)

If all of these visual artifacts are source controlled, then each change workflow can even show THOSE deltas to the human reviewer: "Here's what this screenshot used to look like. This is what this change makes it look like. Approve?"

AI is a tool for humans. Think like a human when using it, for maximum impact.
