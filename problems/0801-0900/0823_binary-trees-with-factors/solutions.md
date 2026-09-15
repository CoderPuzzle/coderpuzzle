# Solutions — Binary Trees With Factors

## Sorted DP over factor pairs

Sorting the array ascending guarantees that both factors of any value `v = a * b` (with `a, b > 1`) appear earlier than `v` itself, so a single left-to-right pass can build every tree bottom-up. Let `dp[i]` be the number of trees rooted at `arr[i]`. Any node can stand alone as a leaf — that is the baseline count of 1 — and every way of giving it children multiplies the possibilities for the two subtrees.

For each `v = arr[i]`, the code scans the earlier values `arr[j]`; when `arr[j]` divides `v` and the cofactor `v / arr[j]` is present in a value-to-index map, the pair contributes `dp[j] * dp[index[other]]` trees. The children are ordered, so the factorizations `(2, 5)` and `(5, 2)` of 10 contribute separately — which is correct, since `[10, 2, 5]` and `[10, 5, 2]` are different trees. The map lookup keeps finding the cofactor at constant time instead of re-scanning.

Counts are reduced modulo `10^9 + 7` as each `dp[i]` is finished (but the multiplication uses unreduced-looking values that are in fact already reduced, so no overflow of Python integers is ever a concern — the modulus only keeps numbers small). The final answer sums the root counts over all values, again modulo the prime.

**Complexity:** `O(n^2)` time, `O(n)` space.
