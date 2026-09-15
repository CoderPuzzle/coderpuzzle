# Solutions — Get the Maximum Score

## Two-pointer merge with crossing max

Walk `nums1` and `nums2` with two pointers, the same way a merge step would,
while keeping a running sum for each array that resets at every shared
value. At each step, advance whichever pointer holds the smaller value,
adding it to that array's running sum; the two running sums track the
"segment" each array has accumulated since the last point the paths could
have crossed. When both pointers land on the same value, that value is a
crossing point: the better of the two segments is locked in — `max(sum1,
sum2)` — plus the shared value itself, both running sums reset to zero, and
both pointers move past it.

This works because a valid path can only switch arrays at a value present
in both, so between two consecutive crossings (or before the first / after
the last) the path is forced to stay in one array — there is nothing to
choose. Picking the larger of the two forced segments at every crossing is
therefore always safe, and it is exactly what the statement's own hint
describes as a segment-by-segment choice. Once either pointer exhausts its
array, the remaining tail of the other array is unambiguous, so the last
step drains both arrays and folds in `max(sum1, sum2)` one final time for
whatever is left.

The running totals are accumulated in a 64-bit integer before any
reduction — with arrays as long as `10^5` and values as large as `10^7`,
an unreduced segment sum can reach roughly `10^12`, well past what a
32-bit accumulator holds — and only the final answer is reduced modulo
`10^9 + 7`.

**Complexity:** `O(m+n)` time, `O(1)` space.
