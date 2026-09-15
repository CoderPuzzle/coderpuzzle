# Solutions — Next Permutation

## Pivot swap and suffix reversal

Reading from the right, the tail past the first element smaller than its successor is a non-increasing suffix — the largest possible arrangement of those values — so no rearrangement inside it can grow the array. That element, the pivot, is the rightmost position that can still increase while everything before it stays fixed.

The method scans right-to-left for the pivot, then finds the successor: the rightmost value greater than it. In a non-increasing suffix that is also the smallest value greater than the pivot, so swapping the two promotes the least possible larger element into the pivot's slot. The suffix stays non-increasing after the swap, and one final reversal of it yields the smallest arrangement of the tail — exactly the next permutation. When the scan finds no pivot at all, the whole array is non-increasing and already the last permutation, so the reversal covers the entire array and wraps around to the first one, which is the sorted order the statement asks for.

Everything happens inside `nums` with a few index variables, which is what the constant-extra-memory requirement demands; the resulting array is returned so the judge can compare it. The extremes fall out of the same three steps: a single element or an all-identical array reverses nothing observable, a strictly ascending array just swaps its last two elements, and a strictly descending one wraps to ascending order.

**Complexity:** `O(n)` time, `O(1)` space.
