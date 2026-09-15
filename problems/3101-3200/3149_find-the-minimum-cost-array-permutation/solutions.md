# Solutions — Find the Minimum Cost Array Permutation

## Bitmask dynamic programming

The score is a cyclic sum, so rotating any permutation leaves it unchanged; among rotations, the one starting with 0 is lexicographically smallest, and perm[0] = 0 can therefore be fixed without losing any optimal solution. What remains is a Traveling-Salesman-shaped search: build perm left to right, paying |last - nums[nxt]| each time nxt is appended, and pay |last - nums[0]| when the final element closes the cycle back to perm[0] = 0.

The DP is f[mask][last] = minimum additional cost to place every element outside mask, given that mask is placed and last is the most recent element, closing edge included. The base case f[full][last] = |last - nums[0]| charges the closing edge; the recurrence picks the cheapest unplaced nxt, adding |last - nums[nxt]| plus f of the extended mask. Evaluating masks in decreasing order guarantees every f[mask | bit] is already final when read, and f[1 << 0][0] ends up holding the global optimum.

Recovering the lexicographically smallest optimum is a greedy walk over the same table: starting from mask = {0}, at each step take the smallest nxt whose edge cost plus f of the resulting state equals f of the current state. Any nxt satisfying that equality keeps the remaining cost optimal, so choosing the smallest such nxt at every step is both optimal and lexicographically minimal. With n <= 14 the 2^n × n table and the n² transition fit easily.

**Complexity:** `O(2ⁿ · n²)` time, `O(2ⁿ · n)` space.
