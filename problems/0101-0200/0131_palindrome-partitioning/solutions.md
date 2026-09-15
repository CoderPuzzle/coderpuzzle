# Solutions — Palindrome Partitioning

## Palindrome Table with Backtracking

The search needs palindrome verdicts on arbitrary substrings, so the code first fills a table `is_pal[i][j]` covering every interval. The fill runs `i` from n - 1 down to 0 and `j` from `i` upward: `s[i..j]` is a palindrome exactly when the ends match and the interior is empty (j - i < 2) or already marked `is_pal[i + 1][j - 1]`. Iterating `i` in reverse guarantees the inner interval is computed before any outer interval that reads it.

The backtracking then consumes the table left to right: at position `start`, try every `end` such that `s[start..end]` is a palindrome, push that piece onto the current partition, recurse from `end + 1`, and pop it on return. When `start` reaches n the pieces tile the whole string and a snapshot is appended to the result. Trying ends in increasing order is precisely what produces the required deterministic output order — partitions with a shorter first piece before those with a longer one, applied recursively to each suffix.

Every single character is a palindrome, so the search always has at least the all-single-characters partition and can never dead-end. The bound n ≤ 16 keeps the enumeration small, though a string of one repeated letter still admits 2^(n-1) partitions, so the running time is inherently output-sensitive; writing P for the number of partitions, the search performs O(P · n) piece pushes in total on top of the table construction.

**Complexity:** `O(n^2 + P · n)` time, `O(n^2)` space.
