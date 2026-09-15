# Solutions — Number of Possible Sets of Closing Branches

The answer is a count over closing sets, and with n <= 10 there are at most
2¹⁰ of them, so every candidate can be checked exhaustively — the problem is
really "how fast can one candidate be checked". That check is an
all-pairs-distance question over whatever branches survive the closure.

## Enumerate closing sets, Floyd-Warshall on the survivors

Every closing set fits in a bitmask. For a candidate mask, the surviving
branches keep only the roads whose two endpoints both survive, and any
shortest path between two survivors can of course only pass through
survivors, so it is enough to run all-pairs shortest paths on the surviving
branches alone. Floyd-Warshall over the n <= 10 survivors gives every
surviving pair's distance, after which the set is counted exactly when every
surviving pair sits within maxDistance.

Parallel roads are handled while seeding the matrix by keeping the minimum
weight per pair, and a closed branch needs no special cleanup: excluding it
from the intermediate loop keeps it out of every route, and only surviving
pairs are ever inspected. Sets leaving zero or one branch alive pass
trivially, which the loop handles naturally since there are no pairs to
violate the bound. A sentinel of 10⁸ marks pairs that stay unreached — larger
than any legal maxDistance, yet small enough that adding two sentinels cannot
overflow a 32-bit integer. The total work is the sum over all 2ⁿ masks of the
cubic scan of their surviving count, about 2 · 10⁵ relaxation steps at n = 10.

**Complexity:** `O(2ⁿ · (n³ + m))` time, `O(n²)` space.
