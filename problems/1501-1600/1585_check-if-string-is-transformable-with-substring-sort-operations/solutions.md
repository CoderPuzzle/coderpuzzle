# Solutions — Check If String Is Transformable With Substring Sort Operations

## Per-digit queues with a Fenwick-tree blocking check

Sorting an arbitrary substring, applied repeatedly, is exactly powerful
enough to let a digit slide left past any digit strictly greater than it
(isolate the two-character substring `[greater, this]` and sort it), but a
digit can never slide left past a strictly smaller digit — sorting only
ever pushes smaller values toward the front, so a smaller blocker can only
grow the gap behind it, never let something bigger cut in front from the
wrong side. Digits with equal value are indistinguishable, so which
original occurrence answers a given request in `t` doesn't matter, but it
is never worse to hand out the earliest remaining occurrence first: group
`s`'s positions into ten FIFO queues by digit value, and walk `t` left to
right, popping the earliest unused occurrence of each needed digit.

Popping an occurrence isn't enough by itself — the popped position also
has to be able to _arrive_ at its slot, which is where the blocking rule
comes in. Maintain one Fenwick tree per digit value, each marking which of
that digit's original positions in `s` are still unconsumed; a prefix
query on digit `d`'s tree at position `x` counts how many of its
remaining occurrences sit left of `x`. When `t`'s next character needs
digit `d` at original position `pos`, sum those prefix counts for every
digit smaller than `d` — if any strictly smaller digit is still sitting
unconsumed to the left of `pos`, it permanently blocks `pos` from ever
reaching this slot, so the transformation is impossible. Otherwise `pos`
is free to arrive, and it is marked consumed by clearing it out of its own
digit's Fenwick tree before moving on to the next character of `t`.

**Complexity:** `O(n log n)` time, `O(n)` space.
