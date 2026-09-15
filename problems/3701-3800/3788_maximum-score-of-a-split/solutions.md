# Solutions — Maximum Score of a Split

## Reverse sweep with running accumulators

Both quantities a split needs are trailing views of one left-to-right scan.
`prefixSum(i)` is what a running sum has accumulated at stop `i`, and
`suffixMin(i)` is what a running minimum over the tail holds when the split
is at `i` — so evaluating all `n - 1` splits is a matter of carrying both
views across the array and reading off their difference at every stop.

One reverse sweep keeps both live without storing anything. The last valid
split `n - 2` seeds it: its prefix is the total minus `nums[n - 1]`, and its
suffix minimum is exactly `nums[n - 1]`. Each step down to split `i` folds
`nums[i + 1]` into both views — into the running minimum, and out of the
running sum — so every element is touched exactly once and no sentinel
initialization is needed. The answer is the largest difference seen.

The running sum outgrows 32 bits at the constraint ceiling. Prefixes reach
`n · 10⁹ = 10¹⁴` even though every element fits in 32 bits, so fixed-width
languages accumulate and return in 64-bit integers; that value also stays
far inside JavaScript's `2⁵³` exact range, so plain numbers carry it
exactly.

**Complexity:** `O(n)` time, `O(1)` space.
