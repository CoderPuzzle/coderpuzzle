# Solutions — Maximum Twin Sum of a Linked List

## Reverse the second half

Use slow and fast pointers to locate the start of the second half, then reverse that half in place. Its new order aligns the last node with the first, the second-last with the second, and so on.

Walk one pointer from the original head and one from the reversed half, taking the maximum of their sums. Every loop and reversal is iterative, so the 100,000-node limit uses no recursion stack.

**Complexity:** `O(n)` time and `O(1)` extra space.
