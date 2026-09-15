# Solutions — 132 Pattern

## Monotonic Stack from the Right

A 132 pattern needs `nums[i] < nums[k] < nums[j]` with `i < j < k`. Scanning from the right turns this into a running feasibility question: for the current position (playing the role of `i`), is there already a valid `(j, k)` pair to its right? The answer is yes exactly when some earlier-seen larger value has a smaller value after it — so the code maintains `third`, the largest value known to sit after something bigger, which is the best possible candidate for `nums[k]`.

`third` is produced by a monotonically decreasing stack of values scanned so far. When the current value exceeds the stack top, everything popped is smaller than the current value and lies to its right — so each popped value certifiably has a larger number before it, and `third` is updated to the last (largest) popped value. Pushing the current value keeps the stack decreasing for future comparisons. A `third` of negative infinity means no valid `(j, k)` pair has formed yet.

At each step, before touching the stack, the code checks whether the current value is smaller than `third`. If so, the current element is a valid `nums[i]` and the pattern exists: the pair that produced `third` lies entirely to the right. Since `third` only ever increases, the check gets easier as the scan proceeds leftward, and no candidate is missed.

Arrays shorter than three elements are rejected up front. All-equal values never trigger the pattern because pops require strict inequality (`stack[-1] < value`), and equal runs just accumulate on the stack; each element is pushed and popped at most once, keeping the scan linear.

**Complexity:** `O(n)` time, `O(n)` space for the stack.
