# Solutions — Unique Number of Occurrences

## Frequency table plus a distinct-count check

First build a hash map from each value to how often it appears — one pass over `arr` with an increment per element. The question then becomes whether any two of those counts are equal, which a second hash set answers directly: inserting every count into a set and checking the set's size against the number of distinct values tells us whether a collision happened. If the two sizes are equal, no two values share an occurrence count.

That size comparison is exactly the test the statement asks for. For example, `[1, 2, 2, 1, 1, 3]` yields counts `{1: 3, 2: 2, 3: 1}` — three distinct values and three distinct counts, so `true`; while `[1, 2]` yields counts `{1: 1, 2: 1}` — two distinct values but only one distinct count, so `false`.

**Complexity:** `O(n)` time and `O(n)` space.
