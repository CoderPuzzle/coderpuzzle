# Solutions — Maximum Subarray Min-Product

## Monotonic stack with prefix sums

Fix which element plays the role of the minimum. For each index, the widest subarray in which it is the minimum stretches from just after the nearest smaller element on its left to just before the nearest smaller element on its right, and since all values are positive the widest such window maximizes the product for that minimum. Taking the maximum over these canonical windows is enough: the optimal subarray's own minimum achieves at least its product through its window. Prefix sums make the sum of any window a subtraction.

Both nearest-smaller boundaries come out of one left-to-right pass with a stack of indices kept in strictly increasing value order. When the current value `cur` is less than or equal to the stack top's value, the top can no longer extend rightward as a minimum, so it pops; its right boundary is the current index `i`, and its left boundary is whatever index remains on the stack beneath it (the nearest strictly smaller value) or `-1` at the edge. The candidate `value * (prefix[i] - prefix[left + 1])` is folded into the running best. Iterating to `n + 1` with a sentinel value of 0 flushes every remaining index at the end.

![The example histogram 1, 2, 3, 2: the last 2 pops at the sentinel, its nearest smaller left neighbor is the 1 at index 0, so its window spans indices 1 to 3 with minimum 2 and sum 7 for the winning product 14; stack snapshots show the strictly increasing stack [0, 1, 2] before the cur 2 pops.](figures/solution-stack-spans.svg)

The `>=` in the pop condition makes equal values evict each other, so only the last element of a run of equals survives to claim the full window spanning the whole run — correct, since the earlier copies merely record the same product over a shorter window. Each index is pushed and popped at most once, and the modulo is applied only at the very end so the maximum is taken over true 64-bit products.

**Complexity:** `O(n)` time, `O(n)` space.
