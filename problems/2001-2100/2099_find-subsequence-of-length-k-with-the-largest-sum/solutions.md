# Solutions — Find Subsequence of Length K With the Largest Sum

## Select by value, return by index

Pair every value with its original index, then sort the pairs by value descending and index ascending. The first `k` pairs maximize the sum; using the index as the tie-break selects the earliest indices among equal cutoff values, which gives the lexicographically smallest optimal index tuple.

Sort those chosen pairs by original index and return their values in that order. This restores the subsequence order without changing which elements were selected.

**Complexity:** `O(n log n)` time and `O(n)` auxiliary space.
