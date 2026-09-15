# Solutions — Shortest and Lexicographically Smallest Beautiful String

The definition only asks for beautiful substrings — the ones with exactly `k`
ones — ranked by length and then lexicographically. With `s.length` at most
100 there is no reason to look past the hinted per-start scan: each left end
admits exactly one shortest candidate, and keeping the best of those candidates
answers the problem.

## Per-start window extension

For a fixed left end `i`, the window `s[i..j]` can hold at most one shortest
beautiful substring. Scanning `j` rightward, the count of ones only grows, so
the first position where it reaches `k` gives the unique shortest beautiful
substring that starts at `i` — any earlier cut has fewer than `k` ones, and
any later cut with exactly `k` ones is strictly longer. If the scan falls off
the right end first, fewer than `k` ones remain from `i` and no beautiful
substring starts there.

Every candidate found this way is compared against the best so far: shorter
wins outright, and among equal lengths the lexicographically smaller string
wins, which is exactly the ordering the statement defines. At most `n` starts
are scanned and each scan walks at most `n` positions (with an up-to-`O(n)`
substring extraction and comparison on a hit), and only the current best
substring is retained. Strings with fewer than `k` ones in total never record
a candidate, so the initial empty best is returned unchanged.

**Complexity:** `O(n²)` time, `O(n)` space.
