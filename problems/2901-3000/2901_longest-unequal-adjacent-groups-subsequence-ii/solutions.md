# Solutions — Longest Unequal Adjacent Groups Subsequence II

## Dynamic programming over feasible predecessors

Let `dp[i]` be the length of the longest valid subsequence that ends at
index `i`, and let `prev[i]` remember the predecessor that achieved it.
Index `j` can precede index `i` exactly when `groups[j] != groups[i]`, the
two words are equal in length, and their hamming distance is exactly 1 —
the hamming check walks the two equal-length strings once and stops at a
second mismatch. Every compatible `j < i` offers `dp[j] + 1`, and `dp[i]`
takes the best offer. Because `j < i`, filling `dp` in index order never
depends on an unfinished value.

Ties are broken deterministically so exactly one answer is produced out of
the many the statement permits: predecessors are scanned from `i - 1`
downward and `dp[i]` only updates on a strict improvement, so `prev[i]`
keeps the latest compatible index attaining the maximum, and the final
answer starts at the latest index attaining the overall maximum. The answer
itself is rebuilt by following `prev` from that index back to the start of
the chain and reversing the walk. All costs are dwarfed by the pair scan:
`O(n²)` pairs, each tested in `O(L)` for words of length at most `L = 10`.

**Complexity:** `O(n² · L)` time, `O(n)` auxiliary space beyond the
returned words.
