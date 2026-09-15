# Solutions — Maximum Value at a Given Index in a Bounded Array

The rules are local — neighbors differ by at most 1 and every element is a
positive integer — but the budget is global. Fixing the peak value
`m = nums[index]` collapses the budget question into arithmetic: any valid
array with that peak satisfies `nums[i] >= max(m - |i - index|, 1)` at every
position (walk down from the peak or hit the positivity floor, whichever
comes first), and the array sitting exactly on those elementwise bounds is
itself valid. So the minimum sum among arrays with peak `m` is `m` plus the
two clamped ramps beside `index`, and it grows strictly with `m`.

## Binary search on the peak

That strict growth makes feasibility monotone: if peak `m` fits the budget,
every smaller peak fits too. Binary search `[1, maxSum]` for the largest
feasible `m` — `1` always fits because the all-ones array sums to `n` and
`n <= maxSum` is guaranteed. Each check sums the two sides in closed form: a
side of width `w` contributes `w*m - w*(w+1)/2` while the ramp is clipped by
the width (`w < m`), and `m*(m-1)/2 + (w - m + 1)` once the staircase bottoms
out at 1 (`w >= m`). On `(4, 2, 6)` the peak 2 costs `2 + 2 + 1 = 5 <= 6`
while 3 costs `3 + 3 + 2 = 8`, so the answer is 2; on `(6, 1, 10)` the peak
3 costs exactly `3 + 2 + 5 = 10`.

Probing candidate peaks up to `maxSum = 10^9` against widths up to `10^9`
pushes the side formulas to about `5*10^17`, past 32 bits, so every sum runs
in 64-bit arithmetic. JavaScript needs one more care: a double is exact only
below `2^53 ~ 9*10^15`, so a side whose clipped staircase already exceeds
`2*10^9 >= 2*maxSum` is declared over budget without multiplying — and any
value it does compute stays at or below `63245 * 10^9 + 10^9`, safely exact.

**Complexity:** `O(log maxSum)` time, `O(1)` space.
