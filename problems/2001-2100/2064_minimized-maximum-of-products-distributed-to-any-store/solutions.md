# Solutions — Minimized Maximum of Products Distributed to Any Store

## Binary Search on the Maximum Load

Feasibility is monotone in the per-store cap `x`: if products can be distributed with no store receiving more than `x`, any larger cap also works, and if `x` is impossible, every smaller cap is too. So the answer is the smallest feasible `x`, found by binary search over the range from 1 up to `max(quantities)` (a single store taking an entire product type shows the maximum is always an upper bound).

The feasibility test counts how many stores a cap `x` requires. A product type with `q` items must be split so that no store gets more than `x`, and since a store receives only one product type, the minimum number of stores for that type is `ceil(q / x)` — computed exactly in integers as `(q + x - 1) // x` to avoid floating point. Summing over all product types gives the total store demand; the cap is feasible exactly when this sum is at most `n`. Any leftover store capacity is harmless because stores may receive nothing.

The search keeps the invariant that `lo` is possibly too small and `hi` is known feasible, converging on the minimal feasible value; the standard lower-mid choice makes each step either raise `lo` or drop `hi` without stalling. With `m` product types and at most about 17 halvings of the value range, the test runs a handful of times.

**Complexity:** `O(m log(max(quantities)))` time, `O(1)` space.
