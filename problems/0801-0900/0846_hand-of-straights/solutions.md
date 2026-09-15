# Solutions — Hand of Straights

## Greedy on sorted counts

A hand is divisible into runs of `groupSize` consecutive values only if its length is a multiple of `groupSize` — that check fails fast. Beyond it, the greedy is forced rather than heuristic: consider the smallest card value still held. Every group containing it must be a run starting exactly at that value (no smaller value exists to extend downward), so `need = counts[value]` groups must begin there simultaneously, and each of the next `groupSize - 1` values must supply at least `need` cards.

The code walks the distinct values in sorted order. At each value with a positive remaining count it takes `need` copies as group starts and subtracts `need` from `counts[v]` through `v, v+1, ..., v+groupSize-1`, returning `false` the moment any value in that window has fewer than `need` copies. Subtracting in bulk (rather than one group at a time) is what keeps the inner scan to a single pass per starting value.

Correctness follows by induction: after consuming the smallest value completely, it never matters again, and the residual multiset is a strictly smaller instance of the same problem with the same greedy obligation at its new minimum. Values exhausted by earlier windows reach the loop with count 0 and are skipped for free.

**Complexity:** `O(u log u + u · g)` time, `O(u)` space, for `u` distinct values and `g = groupSize`.
