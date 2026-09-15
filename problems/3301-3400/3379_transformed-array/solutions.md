# Solutions — Transformed Array

## Modular index arithmetic

Every entry of `result` is decided independently of the others, so the whole
task is one pass that, for each index `i`, lands `abs(nums[i])` steps from
`i` in the direction of its sign and copies the value found there. The
landing index can be computed in one shot instead of stepping: moving `k`
positions from `i` in a circular array of length `n` reaches index
`((i + k) % n + n) % n`, where `k` is `nums[i]` for rightward moves and
`-nums[i]` for leftward ones. The inner `+ n` matters because several
languages truncate the remainder toward zero — without it a leftward move
could produce a negative index; the outer `% n` brings the sum back under
`n` when the offset was an exact multiple away.

Zero needs no special case: a step of zero lands on `i` itself, so
`result[i] = nums[i]`, exactly what the `nums[i] == 0` rule asks for. The
values are small (`|nums[i]| <= 100`, `n <= 100`), so all arithmetic stays
far inside 32-bit range and each landing index is at most a couple of
operations — there is no simulation loop per element at all.

**Complexity:** `O(n)` time, `O(1)` extra space beyond the output array.
