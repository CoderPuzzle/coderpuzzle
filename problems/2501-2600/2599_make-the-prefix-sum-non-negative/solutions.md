# Solutions — Make the Prefix Sum Non-negative

## Greedy with a Min-Heap

Scan the array left to right while maintaining the prefix sum of the arrangement built so far plus a min-heap of every element already seen. Whenever the running prefix drops below zero, the only remedy is to move some earlier element to the end of the array; popping the smallest element seen so far and subtracting it from the prefix repairs the violation at the cost of a single operation.

The choice is optimal by an exchange argument: among all candidates, removing the minimum increases the prefix the most, so any solution that defers a different element while the minimum is available can be rewritten to defer the minimum instead without using more operations and without hurting any later prefix. Because the tests guarantee a solution exists, pushing these negatives to the back always leaves a repairable remainder.

A negative element is not handled when it is first read but at the first prefix it poisons, which is exactly when it must be displaced; each element enters and leaves the heap at most once, so heap operations cost `O(log n)` amortized. If the prefix never goes negative the answer is zero.

**Complexity:** `O(n log n)` time, `O(n)` space.
