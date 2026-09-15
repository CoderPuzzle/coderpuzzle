# Solutions — Palindromic Substrings

## Expand Around Center

Every palindrome is symmetric about a center, and in a string that center is either a single character (odd length) or the gap between two characters (even length). Enumerating all `2n - 1` centers and expanding outward while the characters on both sides match counts every palindromic substring exactly once — each occurrence is discovered from its own center, so duplicates like the two `"aa"` occurrences in `"aaa"` are counted separately, as the problem requires.

The solution loops over each index and tries both center shapes via the pairs `(center, center)` and `(center, center + 1)`. For each, two pointers walk outward as long as they stay in bounds and the characters agree; every successful step records one more palindrome, since the larger palindrome is valid only if the inner one was. The expansion stops at the first mismatch, because wrapping more characters around a non-palindrome can never restore symmetry.

This reuse of inner results is what separates the approach from brute force: a single expansion chain of length `L` certifies `L` palindromic substrings with `L` character comparisons, instead of re-verifying each substring from scratch. The worst case is a string of identical characters, where every expansion runs to the string's edge.

![Expansion around the odd center (1, 1) of "aaa" grows "a" into "aaa"; the even center (0, 1) counts "aa".](figures/solution-center-expansion.svg)

Only loop counters and the running total are kept — no tables of previously computed ranges are needed.

**Complexity:** `O(n^2)` time, `O(1)` space.
