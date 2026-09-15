# Solutions — Orderly Queue

A move lifts one of the first `k` letters to the end, and how much freedom
that buys splits cleanly on `k`. With `k = 1` the only liftable letter is
the very first, so every move is a plain rotation; with `k >= 2` the two
front slots are enough to reorder the string arbitrarily. The answer is the
smallest rotation in the first regime and the sorted string in the second.

## One letter only rotates; two can sort anything

With `k = 1` the single legal move removes `s[0]` and appends it, so the
reachable strings are exactly the `n` rotations of `s` and nothing else.
The answer is the lexicographic minimum over those rotations: try every cut
and keep the best. The shipped scan is the honest `O(n²)` one — `n`
candidates, each built and compared in `O(n)` — which at the `n <= 1000`
bound is a million character operations, far inside any limit.

With `k >= 2`, at least one of the two front letters is not the smallest
letter still waiting, so a non-smallest front letter can always be parked at
the back. Repeating this lets the smallest remaining letter walk to the
front and stay there, then the next smallest, and so on — a selection sort
played through the queue window. Every ordering becomes reachable, and the
minimum over all orderings of a multiset is its sorted arrangement, so the
answer is simply `sort(s)`.

**Complexity:** `O(n log n)` (`k >= 2`) / `O(n²)` (`k = 1`) time, `O(n)`
space — sorting dominates the two-front regime; the rotation scan costs
`O(n)` per cut and stores only the running best.
