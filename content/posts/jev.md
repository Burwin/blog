---
date: 2026-09-17
title: Jev looks crazy valuable
excerpt: I didn't understand it at first, but it looks incredibly powerful for roughly-deterministic automated workflow graphs
---

There's probably a better phrase than "roughly-deterministic automated workflow graphs", but I'm trusting you get the gist.

## Within Software Development

I already think that almost ALL of our approaches to just the workflow of _software development_ is still incredibly lazy when it comes to how we use AI, even the most sophisticated ones. I think that software is a product that we can reliably produce with some measured degree of repeatability. It's a very complex product, but it's still more deterministic than what would otherwise look like a creative endeavor. And there are better and worse ways to produce this product (which may vary depending on the circumstances, I admit).

This means that we can _and should_ eventually build structures around the production and delivery of software features, more and more rigorous over time, without making the production process too rigid to be useful for the many edge cases that something as complex as this often surfaces. I've seen some people online (X) start to mock attempts to build _software factories_, but I don't think their mockery is well-placed. Early attempts at building such structures are certainly lacking, but that doesn't mean that the attempts won't ultimately be fruitful and produce tons of value for businesses.

Concretely, a software factory is essentially "I tell you what to build, and you build it, reliably and efficiently, and you don't build what I don't ask you to build, and you don't break previous functionality"... or something. This is a decision tree/graph. We can visualize this with any basic flowcharting tool (which is great for human conception and auditing, btw).

And this is where Jev comes in... it's a fantastic **_tool_** to use at many of the nodes in our graph, given it's excellence at structured probabilistic decision-making / classification.

I've been building some of these early graphs already, partially automated, and following them for my own dev work to prove the concepts and refine the graph itself before automating too soon (check the 5 steps of Elon). Until Jev, I have two types of nodes:

- CLI tool
- AI LLM

CLI tools are used when we can provide clear input and expect clear deterministic output. We have business rules that cover the expected input cases.

AI is used for a catchall for everything else. These are undeterministic nodes, but I want them automated, to I'm willing to trust AI here to do some unstructured work. But LLMs are very expensive. And not reliable - so I need to constrain them with guardrails in their nodes, instructions (more token cost, and imperfect reliability), and surrounding nodes - to deterministically (CLI) or probablistically (more LLMs) check their work.

But if all I need from the AI is a non-deterministic decision or classification, Jev can now step in as a wildly more efficient and reliable alternative for such nodes.

Benefits?

1. More confidence in the results
2. Dramatically cheaper (20-200x they estimate)
3. Dramatically faster
4. Better auditability and control (Jev provides classifications with corresponding confidence scores)

## Outside of Software Development

I'm bad at thinking of use cases, but here's a couple off the top of my head from projects I've been working on recently:

1. Is this value parsed accurately from this vendor invoice PDF?
2. How accurate is this knowledge base article/paragraph?
3. Does this package of parts contain everything it should in the correct slots?
4. Is this part defective?
5. What account should we suggest for booking this transaction?

I'm barely scratching the surface. Efficient, easy to use, affordable, AI classification with confidence scores will be massively valuable, very quickly.

(It's not terribly new conceptually, either, btw... One of my former employees did something very similar for the oil industry before working for me. Jev is generalized, broadened, optimized, and hardened.)
