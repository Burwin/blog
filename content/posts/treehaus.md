---
date: 2026-07-29
title: Eliminate Spam with a Protocol
excerpt: Spam is getting annoying - emails, texts, phone calls - but we can eliminate it mechanically with an open protocol
---

I get tons of spam emails daily. More than a few spam texts. And too many spam phone calls - even after adding my number to the national do-not-call list.

But it doesn't have to be this way. We can mechanically eliminate it with relatively simple technology, human psychology, and economic friction.

Here's the core of the protocol:

1. Assume three actors: John, Jane, and Ramesh
2. John and Jane know each other and want to be able to communicate via email, text, or voice
3. John and Jane do not know Ramesh, and wish he would stop asking them if they want a business line of credit or to partner up and use Ramesh's overseas spare software development capacity
4. John initiates a Connection Request to Jane, and posts a $5 deposit to a neutral escrow
5. Jane receives John's request and Accepts it, which establishes a trusted relationship between the two of them until one of them elects to sever it, and also returns the $5 back to John
6. Now, John can communicate with Jane, and Jane can communicate with John
7. Ramesh tries to communicate with both of them, but nothing happens because he's not connected with either one, and neither Jane nor John even see any connection attempt come through... zero spam
8. Ramesh doesn't give up so easily, so he tries to initiate a Connection Request to both of them, and posts $5 for each request
9. John and Jane are annoyed to see the spam Connection Request come through from somebody they don't know, but at least they can Reject it and pocket the $5
10. If they want, they can increase the Required Deposit amounts for requests to their accounts via a configuration setting... Elon Musk could set it to $1 billion, for example

That's it. That's the core.

No communications are possible without first establishing a Trust Relationship.

The savvy financial minds noticed that the example above wasn't quite realistic. Any form of money moving is likely going to cost more than $0 to switch hands a couple times, unless the parties are willing to wait multiple days for a "free" ACH transfer to work through the banking system in both directions. So to avoid delays OR transaction costs for immediate transfers, the protocol could also have a "Pre-clearance" mechanism, where Jane knows that John will initiate a Connection Request, and so she communicates with John outside of the protocol (text, email, phone, DM, postal mail, in-person, etc) to exchange a one-time pre-cleared ID, so that when John initiates the request, he can skip the usual blind Deposit requirement and they can establish the Trust Relationship freely and quickly.

What happens to our phones? Email?

They stick around, just begin to wane in importance since the more reliably relevant communication channel is now available.

What if John wants to let any employee from SpaceX contact him? He can setup a blanket rule to allow their email domain and/or their corporate account.

No more spam. Cut them off mechanically, and bleed dry the bad actors that still want to try their chances at spam.

The protocol should be open-sourced. Anybody could implement a version that they can self-host on their own machine at home, or most people can subscribe to any number of competing commercial implementations of the open-sourced protocol.

It's as free as you want it to be.

No spam emails. No spam texts. No spam DMs. No spam voice calls. No spam.

(except on your old legacy technology... but who uses that anymore, anyway?)
