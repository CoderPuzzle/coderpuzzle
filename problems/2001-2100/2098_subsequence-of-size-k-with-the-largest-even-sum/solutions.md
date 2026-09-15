# Solutions — Subsequence of Size K With the Largest Even Sum

## Repair the largest unconstrained sum

Sort the numbers in descending order and select the largest `k`. If their sum is even, it is already optimal. Otherwise, make the cheapest parity-changing replacement: either remove the smallest selected odd and add the largest unselected even, or remove the smallest selected even and add the largest unselected odd.

Take the better valid replacement, or return `-1` if neither exists. Use 64-bit accumulation because the sum can reach `10¹⁰`.

**Complexity:** `O(n log n)` time and `O(n)` space for the sorted array.
