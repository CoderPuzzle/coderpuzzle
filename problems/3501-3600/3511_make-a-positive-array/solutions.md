# Solutions — Make a Positive Array

## Greedy right-endpoint replacement

Only windows of length 3, 4 and 5 ever need to be checked. Any subarray of
length `L >= 6` splits into consecutive chunks of length 3, 4 or 5 (strip
off length-3 chunks until 3, 4 or 5 remain), and each chunk is itself a
subarray — so if every length-3/4/5 window is positive, every longer
subarray is a sum of positive chunks and therefore positive too. A
replacement at some index can only help windows that contain it, and
setting that slot to a huge value makes every containing window positive
at once, so the task is exactly the classic minimum interval-stabbing
problem over the bad windows: choose the fewest points such that every
bad window contains one.

The greedy scans the right endpoint `i` left to right, maintaining
effective values where a replaced slot holds `5×10⁹`. If any length-3/4/5
window ending at `i` has a non-positive sum, `nums[i]` is replaced there.
Placing the point at the rightmost slot of the earliest-ending still-bad
window is the optimal stabbing choice (any later point would leave that
window unstabbed, and an earlier one stabs strictly fewer windows to its
right), and the fresh `5×10⁹` simultaneously fixes every other bad window
that contains `i` — which is why the scan never needs to revisit an
endpoint. Windows containing a replaced slot can never test non-positive
again: the slot contributes `5×10⁹` against at most four untouched
elements of magnitude `10⁹`.

![On nums = [-1, -2, 3, -1, 2, 6] the three bad windows [0..2] (sum 0), [0..3] (sum -1) and [1..3] (sum 0) all contain index 2, so the greedy's single replacement nums[2] = 5×10⁹ stabs all three at once — answer 1.](figures/solution-stabbing-bad-windows.svg)

`5×10⁹` is comfortably inside the allowed replacement range `±10¹⁸`, and
window sums are bounded by `5 × 5×10⁹ = 2.5×10¹⁰`, so 64-bit integers
carry them in every language; JavaScript doubles stay exact because
`2.5×10¹⁰` is far below `2⁵³`. Each endpoint examines at most three
windows of at most five elements, giving a single linear pass.

**Complexity:** `O(n)` time, `O(n)` space.
