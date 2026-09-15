# Solutions — Minimum Swaps to Group All 1's Together II

## Circular fixed-size sliding window

Let `ones` be the total number of ones. Any final group occupies a circular window of exactly that length, and every zero currently inside it must be swapped with a one outside it.

Count ones in the first such window, then slide its start through all `n` circular positions using modular indices. The answer is `ones` minus the largest number of ones already contained in any window; zero or all-one arrays naturally return zero.

**Complexity:** `O(n)` time and `O(1)` extra space.
