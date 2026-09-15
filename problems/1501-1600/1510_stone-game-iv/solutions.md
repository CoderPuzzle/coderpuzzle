# Solutions — Stone Game IV

## Bottom-up reachability DP

Whoever moves at a pile of `i` stones wins exactly when at least one legal
move — removing some `k * k` stones for `k >= 1` — leaves the opponent
facing a pile the opponent cannot win from. That is a simple recursive
definition (`wins[i]` is true iff some `wins[i - k*k]` is false), and it is
computed bottom-up into a boolean array `wins` of size `n + 1`, with
`wins[0] = false` since the player to move at an empty pile has already
lost.

For each pile size `total` from `1` to `n`, the code tries every square
`k * k` up to `total` and stops as soon as it finds one that leaves
`wins[total - k * k]` false — that single winning move is all a player
needs, so there is no reason to keep scanning further squares once one is
found. The answer is `wins[n]`, since Alice is the player to move at the
starting pile.

**Complexity:** `O(n * sqrt(n))` time (for each of the `n` pile sizes, up to
`sqrt(n)` square moves are tried), `O(n)` space for the `wins` array.
