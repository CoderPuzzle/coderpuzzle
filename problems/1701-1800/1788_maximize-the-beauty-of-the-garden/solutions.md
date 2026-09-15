# Solutions — Maximize the Beauty of the Garden

## Equal endpoints, positive middles

Because flowers may be removed freely, a valid garden is decided by two
positions alone: the first and the last flower that survive. Those two must
share a beauty value `v`, and every other survivor must sit between them.
So for each pair `i < j` with `flowers[i] == flowers[j]`, the best garden on
those endpoints keeps `flowers[i]` and `flowers[j]` plus every strictly
positive flower strictly between them — dropping a middle negative costs
nothing, and no flower outside `[i, j]` may survive. The answer is the
maximum of `2v` plus the positive flowers strictly between `i` and `j`,
over all such pairs.

Scanning left to right with `pos`, the running sum of positive values,
turns that maximum into one pass: `seen[v]` remembers the smallest value
`pos` has taken just after a past occurrence of `v`. Meeting `v` again at
`j` closes a garden whose sum is `2v + pos - seen[v]`, since the kept
middles are exactly the positives between the remembered occurrence and
`j`. `pos` never decreases, so the smallest `seen[v]` belongs to the first
occurrence of `v` — widening the span never narrows it — and each value
needs only that single stored number. The statement promises some valid
garden exists, so some pair always closes and the running answer is set.

Every total stays comfortably inside the bounds: at most `10⁵` flowers of
at most `10⁴` beauty each cap any garden sum near `10⁹`, below `2³¹ - 1`
(and far below `2⁵³`), so plain machine integers are exact. The hash map
holds one entry per distinct value.

**Complexity:** `O(n)` time, `O(n)` space.
