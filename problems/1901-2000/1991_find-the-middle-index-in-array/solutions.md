# Solutions — Find the Middle Index in Array

## Running left sum against the total

For a fixed index `i` the right side's sum is the total minus the left side's
sum minus `nums[i]` itself, so the middle-index condition becomes
`left == total - left - nums[i]`. Rather than summing both sides from scratch
for every candidate, the total is computed once up front and a single pass
maintains `left`, the sum of everything before the current index.

At each position the code compares `left` against the right side's sum and
returns the index on the first match. Because the pass moves left to right and
returns immediately, it finds the leftmost valid index; the empty-side
conventions fall out of the formula, since an index 0 has `left == 0` and the
last index has an empty right side. If no position satisfies the equality the
loop ends and `-1` is returned.

No prefix-sum array is needed — one running total and one running left sum
suffice, and all sums are bounded by `100 * 1000 = 10⁵`, comfortably inside
32-bit range.

**Complexity:** `O(n)` time, `O(1)` space.
