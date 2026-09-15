# Solutions — Minimum Replacements to Sort the Array

## Greedy Right-to-Left with Optimal Split Ceiling

Splitting a number into two parts can only create smaller numbers, so it never helps to touch the last element: any violation to its left can be repaired by splitting that left element instead. Working from right to left, maintain `bound`, the maximum value the current element may take so that everything to its right already forms a non-decreasing suffix (initially the last element). An element `x <= bound` needs no work and tightens the bound to `x`.

When `x > bound`, `x` must be broken into `k` pieces whose sum is `x`, each at most `bound`, using `k - 1` operations. The fewest pieces is `k = ceil(x / bound)`, which is feasible because `k` pieces of sum `x` can always be balanced so the largest is `ceil(x / k) <= bound` (distribute the sum as evenly as possible). Among all `k`-piece splits, making the pieces as even as possible maximizes the smallest piece — here the new bound for the next element to the left is `floor(x / k)`, the largest value the smallest piece can be, and greedy evenness leaves the most room to the left. Note the pieces themselves need not stay individually sorted-adjacent beyond being `<= bound` per position; arranging them ascending within the slot keeps the array non-decreasing.

The loop processes each of the remaining elements once with pure arithmetic — no simulation of pieces, so values up to `10^9` are handled directly. Edge cases: an already sorted array accumulates zero operations; repeated equal values simply refresh the bound without splits; and a long descending prefix costs one `k - 1` term per element, bounded by the value magnitudes.

**Complexity:** `O(n)` time, `O(1)` extra space.
