# Solutions — Campus Bikes II

## Bitmask DP over Used Bikes

The assignment must be a one-to-one matching between workers and bikes minimizing total Manhattan distance. With at most 10 bikes, the set of already-used bikes fits in a 10-bit mask, which suggests a DP over subsets: dp[mask] is the cheapest total distance for assigning the first popcount(mask) workers to exactly the bikes in mask. The position state is redundant because the mask determines how many workers have been assigned — workers are filled in their given order.

The code iterates masks in increasing numeric order (a valid topological order, since adding a bit only increases a mask), skips unreachable states, and records the best cost among masks with exactly n bits set. From each reachable mask with a < n workers assigned, it tries every unused bike b, relaxing dp[mask | (1 << b)] with the current cost plus the precomputed Manhattan distance dist[a][b]. The distance table is built once up front so the DP loop does only table lookups.

This forward-relaxation formulation visits each of the 2^m states once and branches over at most m bikes, an enormous saving over the n!·C(m,n) brute force (10! ≈ 3.6 million versus 2^10·10 ≈ 10 thousand transitions). Edge cases: n = m is the minimum-cost perfect assignment; extra bikes simply leave some masks with more bits than needed unused, and those states are never expanded past the a == n check.

**Complexity:** `O(2^m · (m + n))` time, `O(2^m)` space, where m is the number of bikes.
