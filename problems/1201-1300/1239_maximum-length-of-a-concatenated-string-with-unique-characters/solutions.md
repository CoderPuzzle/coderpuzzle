# Solutions — Maximum Length of a Concatenated String with Unique Characters

## DFS Backtracking with Bitmasks

The key insight is that a candidate concatenation is fully characterized by which of the 26 letters it contains, so each string and each partial combination can be represented as a 26-bit mask. Two masks are compatible exactly when their bitwise AND is zero, and the length of a combination is just the popcount of its mask — no string is ever re-scanned during the search.

Preprocessing converts each input string to its mask, marking it `-1` if the string itself repeats a character (such a string can never appear in a valid concatenation, so it is skipped entirely). The depth-first search walks the array with a start index: at each call it records the popcount of the current mask as a candidate answer, then tries extending with every later string whose mask is not `-1` and shares no letter with the accumulated mask. The start index only moves forward, which enumerates each subsequence once (in index order) instead of all orderings — concatenation length is order-independent, so nothing is lost.

Because `arr` has at most 16 entries (`n = len(arr)`), the search space is at most `2^n` subsequences, small enough to exhaust directly. The empty selection gives the starting candidate 0, and any single self-consistent string immediately beats it. Duplicate-letter strings and conflicting extensions prune branches early, keeping the recursion tree far below the theoretical bound in practice.

**Complexity:** `O(2^n · n)` time, `O(n)` space.
