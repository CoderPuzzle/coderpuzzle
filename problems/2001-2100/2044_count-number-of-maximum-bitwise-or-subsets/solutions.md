# Solutions — Count Number of Maximum Bitwise-OR Subsets

## Include-or-exclude depth-first search

The bitwise OR of the whole array is the largest attainable OR, because adding an element to a subset can only set more bits. Compute that target first, then recursively decide for every index whether to exclude its value or include it in the running OR.

![Starting from or = 0 over nums = [3,1], the include-or-exclude tree skips or takes 3 and then 1; the two leaves that reach the target 3 are the subsets [3] and [3,1], so the answer is 2.](figures/solution-include-exclude-or-tree.svg)

At each leaf, contribute one exactly when the accumulated OR equals the target. Since every input value is positive, the target is positive and the empty subset cannot be counted accidentally. Elements with equal values still occupy different recursion levels, so subsets that choose different indices remain distinct.

**Complexity:** `O(2^n)` time and `O(n)` auxiliary space for the recursion stack.
