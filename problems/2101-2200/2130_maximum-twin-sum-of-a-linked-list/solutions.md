# Solutions — Maximum Twin Sum of a Linked List

## Reverse the second half

Use slow and fast pointers to locate the start of the second half, then reverse that half in place. Its new order aligns the last node with the first, the second-last with the second, and so on.

Walk one pointer from the original head and one from the reversed half, taking the maximum of their sums. Every loop and reversal is iterative, so the 100,000-node limit uses no recursion stack.

![Reversing the second half of [5,4,2,1] into 1 → 2 lines each twin pair up in a column, so the two-pointer walk reads sums 6 and 6 and the maximum twin sum is 6.](figures/solution-reverse-second-half-twin-columns.svg)

**Complexity:** `O(n)` time and `O(1)` extra space.
