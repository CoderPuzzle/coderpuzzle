# Solutions — Shortest String That Contains Three Strings

## Enumerate orderings, join on maximal overlap

Any shortest answer lays its three words out in some order along the string, each
neighbouring pair joined on an overlap — a suffix of the earlier word equal to a
prefix of the later one. With only three words there are just six such orderings,
so we can simply try them all: merge the first two words on their largest
overlap, merge the third onto that result, and keep the best candidate, shorter
first and lexicographically smaller among equals.

Before merging, words that cannot constrain the answer are dropped: a word that
is a substring of another is already contained in every superstring of that
other word, and exact duplicates collapse the same way. What survives is one,
two, or three words; the one-word case is the answer itself. The merge helper
takes the largest `k` with `x[-k:] == y[:k]`, because a maximal overlap is
exactly what makes the join as short as possible — and `k = 0`, plain
concatenation, always works as the fallback.

Each of the constant number of chains does two joins, so the whole search is
bounded by the cost of one join: scanning overlaps up to the word-length cap
`n <= 100` with `O(k)` slice comparisons each. The candidate strings never
exceed the 300-character concatenation bound.

**Complexity:** `O(n²)` time, `O(n)` space.
