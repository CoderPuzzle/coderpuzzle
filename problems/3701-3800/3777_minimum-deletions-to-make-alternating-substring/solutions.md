# Solutions — Minimum Deletions to Make Alternating Substring

Queries mix point updates to the string with "how many deletions does this
range need" range questions, so the answer has to be maintainable in place.

## Fenwick tree over the equal-adjacency array

Define eq[i] = 1 when i >= 1 and s[i] == s[i - 1], else 0. No alternating
substring can keep both members of an equal adjacent pair, and deleting one
character per equal pair always suffices — removing the loser of a pair
leaves its two neighbours unequal, because they equaled the same deleted
character — so the minimum number of deletions over s[l..r] is exactly
sum(eq[l+1..r]).

A Fenwick tree (BIT) over eq turns that into `O(log n)` per query: a type-2
query is the prefix difference `pref(r) - pref(l)`, and a flip of s[j] can
only change eq[j] (its pairing with s[j-1]) and eq[j + 1] (its pairing with
s[j + 1]) — every other adjacency is untouched — so each type-1 query
rewrites at most two point values. All loops are iterative, and every answer
is bounded by n, so plain 32-bit counters are safe throughout.

**Complexity:** `O((n + q) log n)` time, `O(n)` space.
