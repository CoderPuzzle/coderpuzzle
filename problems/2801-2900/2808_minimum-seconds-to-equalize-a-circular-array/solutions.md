# Solutions — Minimum Seconds to Equalize a Circular Array

## Minimize the widest occurrence gap over all candidate values

Fix the value x that the array will finally hold and look only at the cells
where x already occurs. On a circle these occurrences cut the array into
arcs, one arc after each occurrence up to the next one; every second each
arc shrinks by one cell from each of its two ends, so an arc spanning g
steps between consecutive occurrences needs floor(g / 2) seconds to fill.
Value copies travel at most one step per second, and the midpoint cell of
an arc sits floor(g / 2) steps away from both flanking occurrences — and
from every other occurrence of x — so no schedule beats that bound, while
letting each frontier copy inward attains it. The seconds needed for x are
exactly half of its widest consecutive-occurrence gap, wrap-around from
the last occurrence back to the first included. The answer is this
quantity minimized over every value
that occurs in nums: each candidate is reachable (it already owns cells),
and an unoccurring final value would only be slower than seeding from some
value that does occur.

On nums = [2, 1, 3, 3, 2], value 3 sits at indices 2 and 3: its wrap-around
gap is first + n − last = 2 + 5 − 3 = 4 steps, so it needs ⌊4 / 2⌋ = 2
seconds.

![On circular nums = [2, 1, 3, 3, 2], the two occurrences of 3 leave a
wrap-around arc of 4 steps, whose frontiers fill one cell per second from
both ends to equalize in ⌊4 / 2⌋ = 2 seconds.](figures/solution-widest-occurrence-gap.svg)

One sweep gathers everything per value with hash maps: the first index,
the last index seen so far, and the widest forward gap between consecutive
occurrences recorded when a repeat arrives. A second loop over the values
combines the widest forward gap with the wrap-around gap first + n − last,
halves it, and keeps the minimum. Because gap halving is monotone, taking
the maximum gap first and then flooring is safe. Every gap is at most n,
so the result is bounded by floor(n / 2) ≤ 50 000 — comfortably inside
32-bit range — and single-occurrence values fall out naturally with their
lone full-circle gap of n.

**Complexity:** `O(n)` time, `O(n)` space.
