# Solutions — Collecting Chocolates

## Try every rotation count

After exactly `k` operations, the chocolate that started at index `i` sits at
type `(i + k) mod n`, so buying type `t` after `k` operations costs
`nums[(t - k) mod n]`. Each extra rotation therefore offers every type one new
candidate price — the element one step further back in the array — and never
takes away a price it already offered. Collecting everything after exactly `k`
operations costs the sum over types of the cheapest price seen within the
first `k` rotations, plus `k * x` for the operations themselves.

Only `k` from `0` to `n - 1` needs trying: after `n` operations every chocolate
is back at its starting type, so any larger count produces a layout identical
to some smaller `k` while paying an extra `n * x`. The code sweeps those counts
while maintaining a running per-type minimum `cheapest[t]`; at step `k` it
folds in `nums[(t + n - k) mod n]` for every type, sums them, adds `k * x`,
and keeps the smallest total seen. Totals reach about two trillion (a thousand
purchases of `10⁹` plus nearly a thousand paid operations), which overflows 32
bits and requires 64-bit accumulation.

**Complexity:** `O(n²)` time, `O(n)` space.
