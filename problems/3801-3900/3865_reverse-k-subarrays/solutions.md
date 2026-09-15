# Solutions — Reverse K Subarrays

## Two-pointer block reversal

The array is a concatenation of k blocks, each of length m = n / k, and the
only work is to reverse each block independently. A two-pointer sweep over
one block swaps its two ends, moves inward, and stops when the pointers
meet — the classic in-place reversal, applied block by block.

The code walks the blocks left to right. For each block it starts pointers
at its two ends and swaps them toward the middle, then moves to the next
block's start. The result is built in a copy of the input so the original
array is never mutated. When k = n each block is a single element and the
array is returned unchanged; when k = 1 the whole array is reversed by one
sweep. Every element is swapped at most once, so the running time is linear
regardless of the block layout.

All values are at most 1000 and the array length is at most 1000, so every
quantity stays comfortably inside a 32-bit integer and exact as a
JavaScript number. Nothing beyond the output copy is allocated.

**Complexity:** `O(n)` time, `O(n)` space.
