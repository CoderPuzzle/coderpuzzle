# Solutions — Minimum Number of Operations to Convert Time

## Convert to minutes, then take the largest steps first

Parsing both "HH:MM" strings into minutes-since-midnight turns the problem
into making exactly one difference `diff = correct - current` (`0` to `1439`)
using the increments 1, 5, 15, 60. Because each larger increment is a
multiple of every smaller one, greedy is optimal: any optimal solution can be
rewritten so all 60s come first, then 15s, then 5s, then 1s — swapping a mix
of smaller coins for one bigger coin never increases the count. So the answer
is simply `diff/60 + (diff%60)/15 + ((diff%60)%15)/5 + the remaining ones`,
one division-and-modulo per increment.

**Complexity:** `O(1)` time and space (constant-size parsing and four
divisions).
