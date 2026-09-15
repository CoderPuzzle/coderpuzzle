# Solutions — Minimum Number of Food Buckets to Feed the Hamsters

## Greedily place each needed bucket to the right

Scan from left to right, skipping any hamster already fed by a bucket immediately to its left. For an unfed hamster, prefer an empty position on its right: that bucket feeds the current hamster and may also feed the next one. If the right position is unavailable, place a bucket in the empty position on the left; if neither adjacent position is empty, feeding every hamster is impossible.

Mark placed buckets in a mutable copy of the string so later hamsters can detect them. Choosing the right position never harms an earlier hamster and offers at least the same help to the unprocessed suffix as choosing the left, which establishes the greedy choice.

**Complexity:** `O(n)` time and `O(n)` space for the mutable string copy.
