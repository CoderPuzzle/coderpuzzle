# Solutions — Minimum Moves to Reach Target Score

## Work backward greedily

Reverse the process from `target` toward `1`. When the value is odd, the last forward move could not have been a doubling, so subtract one. When it is even and a doubling remains available, halving removes more value in one move than any increment reversal and is optimal.

Once no doubling remains, the only possible reverse operation is subtraction, so add the remaining `target - 1` moves at once. This also handles `maxDoubles = 0` without a long loop.

**Complexity:** `O(log target + maxDoubles)` time and `O(1)` space.
