# Solutions — Peak Index in a Mountain Array

## Binary search on the slope

The mountain guarantee turns every comparison into a signed guide. Any index
`i` is either on the ascent, where `arr[i] < arr[i + 1]`, or at the summit or
on the descent, where `arr[i] > arr[i + 1]` — strictness rules out ties, so
exactly one index, the peak, sits at the boundary between the two. Finding the
first index on the falling side is precisely the shape binary search on a
monotone predicate solves, which is why the statement's `O(log n)` target is
reachable at all: the answer is where the comparisons flip, and each
comparison discards half the candidates.

Keep an interval `[lo, hi]` that always contains the peak, starting as the
whole array. Probe the midpoint: a rise `arr[mid] < arr[mid + 1]` certifies
that the summit lies strictly right of `mid`, so `lo` jumps to `mid + 1`;
anything else means `mid` is the summit or already past it, so `hi` falls to
`mid`. Reading `arr[mid + 1]` is safe because `mid < hi <= n - 1` keeps the
probe in range, and every round strictly shrinks the interval, so `lo == hi`
converges on the peak exactly.

Example 1 traces `[0,1,0]`: `mid = 1` sees `1 > 0` and sets `hi = 1`, then
`mid = 0` sees `0 < 1` and sets `lo = 1`, leaving `lo == hi == 1` — the
answer. Values are only ever compared, never combined, so the constraint's
10⁶ extremes need no arithmetic wider than the comparisons themselves, and
the index variables fit comfortably in 32 bits.

**Complexity:** `O(log n)` time, `O(1)` space.
