# Solutions — Longest Word With All Prefixes

A word qualifies exactly when its entire prefix chain — the word itself
and every cut back to one character — sits in the word set. That chain
has as many links as the word has characters, so membership testing per
candidate is cheap; ordering candidates so that earlier ones win ties is
what resolves the tie rule.

## Sorted scan with hash-set prefix checks

Deduplicate into a hash set, sort the distinct words lexicographically,
and sweep in order: a word becomes the new best only when it is strictly
longer than the current best and all of its prefixes down to length 1
exist in the set. Lexicographic order guarantees the first qualifier at
any record length is the smallest of that length, so no separate tie
handling is needed. Total membership work is bounded by the sum of word
lengths.

**Complexity:** `O(L log W)` time (`L` total characters, `W` words),
`O(L)` space.
