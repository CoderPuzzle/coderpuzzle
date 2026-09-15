# Solutions — Count Asterisks

## One pass with an in-pair flag

Walk `s` once keeping a boolean for whether the scan currently sits inside a bar pair. Every '|' flips the flag, and since the bars come in pairs the flag is down exactly on characters that are outside every pair; a '*' increments the answer only when it sees the flag down.

Nothing else is needed — no stack and no index arithmetic — because the statement guarantees each '|' belongs to exactly one pair, so a single toggle per bar reconstructs the pairing as it goes.

**Complexity:** `O(n)` time, `O(1)` space.
