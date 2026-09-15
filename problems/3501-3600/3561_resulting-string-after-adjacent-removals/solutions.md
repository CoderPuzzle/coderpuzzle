# Solutions — Resulting String After Adjacent Removals

## Stack cancellation, one pass

Scanning left to right with a stack reproduces the leftmost-first removal
order exactly. The stack always holds the fully reduced form of the prefix
processed so far: entries were compared pairwise when the upper one was
pushed, and nothing below the top changes unless the top is removed. So when
the next character arrives, the only new adjacency it participates in is with
the stack top; every removable pair further right involves characters not yet
read. If the top and the incoming character are circular-adjacent — their
difference modulo 26 is 1 in either direction — that pair is precisely the
leftmost removable pair, so both disappear, exactly as the rule demands.

The subtlety is the cascade: deleting a pair can expose a new pair across the
gap, and a second data structure would have to rescan for it. The stack gets
this for free — after a pop, the newly exposed top is sitting one slot below,
and it is compared against the _next_ incoming character, which is the pair
the leftmost rule would test next. Chained removals therefore happen as the
scan continues, and each character is pushed and popped at most once.

Circularity ('a' next to 'z') is handled by taking the letter difference
modulo 26 in both directions rather than comparing raw distance, which would
miss the wrap-around pair. Everything is iterative — a flat buffer over
`10⁵` characters — so no recursion depth is involved.

**Complexity:** `O(n)` time, `O(n)` space.
