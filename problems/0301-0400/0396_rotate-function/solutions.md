# Solutions — Rotate Function

## One demotion per rotation

Evaluating every `F(k)` from scratch costs `O(n²)`, but two consecutive
rotations are almost the same weighting: moving from rotation `k - 1` to
rotation `k` shifts every element one seat along, so each weight rises by
exactly one — except the single element that wraps around from the last seat
to the first, which falls from weight `n - 1` to weight `0`. Each rotation
demotes exactly one element, `nums[n - k]`, and promotes all the rest. Adding
the two effects together gives `F(k) - F(k-1) = (sum - nums[n-k]) -
(n - 1) * nums[n-k] = sum - n * nums[n-k]`, where `sum` is the constant total
of the array.

So one pass computes `total` and `F(0)` together, and each of the remaining
`n - 1` values costs a single multiply-add: fold in `total - n * nums[n-k]`
and keep the running maximum. The statement's first example is this walk
itself — `25`, then `25 + 15 - 4*6 = 16`, then `16 + 15 - 4*2 = 23`, then
`23 + 15 - 4*3 = 26`. No rotation is ever materialized; the array is read in
place and only a handful of scalars exist.

The arithmetic fits the statement's guarantee with room to spare: the total
reaches at most `10⁷` in magnitude (`10⁵` elements of magnitude `100`), a
single step changes the running value by at most `2 · 10⁷`, and the generated
cases keep every `F(k)` — not just their maximum — inside the 32-bit range, so
plain machine integers carry the whole computation.

**Complexity:** `O(n)` time, `O(1)` space.
