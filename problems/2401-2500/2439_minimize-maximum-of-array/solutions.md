# Solutions — Minimize Maximum of Array

## Prefix Average Upper Bound

An operation moves one unit of value from `nums[i]` to `nums[i-1]`, so value only ever travels leftward. That single observation pins down the answer: for any prefix ending at index `i`, the operations can redistribute value within that prefix however we like, but nothing can enter or leave it except inflow from the right. Hence the maximum over the prefix is at least the ceiling of the average, `ceil(prefix_sum / (i+1))`, and the overall answer is at least the maximum of these prefix ceilings over all `i`. Note that later (longer) prefixes can have larger ceilings, and the very first element alone gives the bound `nums[0]`, so every relevant constraint is captured.

The bound is also achievable. Process left to right and imagine pushing excess right-to-left conceptually: whenever the running prefix total permits, values arriving from the right are used to level earlier positions up to the running target. Because each prefix can be perfectly balanced to its own ceiling (moving units from a later element to an earlier one is always allowed), and the target is non-decreasing in the prefix bound we finally settle on, the maximum of all prefix ceilings is attainable. The classic `10,1` example shows why the bound cannot be smaller: no operation increases the first element, and spreading its 10 to the right is impossible, so the answer is 10, which is exactly `ceil(10/1)`.

The code is a single pass accumulating `total` and tracking the largest `ceil` computed as `(total + i) // (i + 1)` — integer arithmetic that rounds the prefix average up without floating point. Only two scalars are kept.

**Complexity:** `O(n)` time, `O(1)` space.
