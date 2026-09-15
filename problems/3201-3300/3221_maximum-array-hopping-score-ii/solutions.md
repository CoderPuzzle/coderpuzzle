# Solutions — Maximum Array Hopping Score II

Every point on a hop is earned at its landing spot, not its takeoff: the
score of `i -> j` is distance times `nums[j]`. So the only decisions that
matter are where the path lands, and the best landing spots are dictated
by what the remaining suffix can still offer.

## Suffix-maximum hops

From any landed position, no intermediate stop can beat going straight to
the farthest index that attains the maximum of the remaining suffix. Every
element after the current position is at most that maximum, so rerouting
the rest of a path through it swaps each leg's distance-weighted value for
at least as much per unit of distance over exactly the same ground — an
exchange that never loses. Ties between equal maxima go to the later
occurrence, since the same landing value over a longer first hop scores
more. The optimal play is therefore fixed: precompute, right to left, the
farthest argmax of every suffix, then walk that chain from index 0,
hopping from each position straight to the next suffix maximum until the
last index is reached.

With lengths up to `10⁵` and values up to `10⁵`, one hop can pay close to
`(n - 1) * max(nums)` — about `10¹⁰`, far beyond 32-bit range — so typed
languages accumulate in 64-bit integers; JavaScript's Number stays exact
because the total is below `2⁵³`.

**Complexity:** `O(n)` time, `O(n)` space.
