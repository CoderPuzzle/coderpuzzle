# Solutions — Check If a String Contains All Binary Codes of Size K

## Substring Set With Early Exit

There are exactly 2^k binary codes of length k, and s contains all of them if and only if the set of its distinct length-k substrings reaches that size. The string offers only len(s) - k + 1 windows, so the task is purely one of collecting distinct windows and comparing the count.

The solution slides over every starting index, inserting each length-k slice into a hash set, and returns true the moment the set reaches 2^k entries. The early exit matters when k is small and the codes run out long before the string does. If the scan finishes with fewer than 2^k distinct windows, it returns false. A string shorter than k is rejected up front, since it cannot host any code of length k at all.

Storing the slices directly, rather than folding them into k-bit integers, keeps the logic minimal at the cost of k characters per entry. Memory is bounded by the smaller of the window count and 2^k entries, each of length k, which stays modest even for the largest inputs — and the early exit means a true verdict never allocates more than 2^k strings.

**Complexity:** `O(n · k)` time, `O(min(n, 2^k) · k)` space.
