# Solutions — Smallest Index With Equal Value

## Scan from left to right

Visit the indices in increasing order and compare each value with the last decimal digit of its index, `i mod 10`. As soon as the two are equal, return that index.

Because the scan is left to right, the first match is necessarily the smallest valid index. If the scan finishes without finding one, return `-1`.

**Complexity:** `O(n)` time and `O(1)` space.
