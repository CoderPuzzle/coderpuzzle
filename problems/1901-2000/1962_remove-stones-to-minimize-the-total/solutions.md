# Solutions — Remove Stones to Minimize the Total

## Greedy Max-Heap

Each operation removes `floor(piles[i] / 2)` stones from one pile, and operations are applied exactly `k` times. Since the amount removed grows with the pile's current size, the greedy choice is always to operate on the currently largest pile: any schedule that operates on a smaller pile while a larger one exists can be improved (or at least not worsened) by swapping the operation to the larger pile, because the removal function is non-decreasing in the pile value.

The solution stores the piles in a max-heap (Python's `heapq` with negated values), pops the maximum, removes half of it, and pushes the remainder back, `k` times. `heapreplace` fuses the pop and push into one sift, keeping each round logarithmic in the heap size.

One useful early exit: once the maximum pile equals 1, `floor(1 / 2)` removes nothing, so every remaining operation is a no-op and the loop can stop immediately. This matters when `k` is large relative to the total stone count. The final answer is the sum of the heap contents, which is why the early break is safe — all remaining operations would leave the total unchanged.

**Complexity:** `O(n + k log n)` time, `O(n)` space.
