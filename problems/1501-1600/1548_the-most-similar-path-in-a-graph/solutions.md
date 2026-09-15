# Solutions — The Most Similar Path in a Graph

## Dynamic programming over path position and ending city

Build an adjacency list from `roads`. Let `dp[i][c]` be the fewest
differing positions among every valid path of length `i + 1` (roads
already respected) that ends at city `c` and is compared against the
first `i + 1` entries of `targetPath`. The base row scores every city
against `targetPath[0]`: `dp[0][c] = 0` if `names[c] == targetPath[0]`,
else `1`. Each later row only needs the row before it: `dp[i][c]` is the
smallest `dp[i - 1][u]` over roads `u - c`, plus `1` if `names[c] !=
targetPath[i]`, since any path ending at `c` at position `i` must have
arrived from some neighbor `u` at position `i - 1`.

The answer's cost is the smallest entry of the last row, `min(dp[L -
1])`. To recover an actual path rather than just its cost, each cell
also stores which neighbor produced its minimum (a `parent` table filled
alongside `dp`); starting from the city minimizing the last row, that
table is walked backward one position at a time to rebuild the full
sequence of cities, which is then reversed into forward order. When
several neighbors tie for a cell's minimum, keeping the first one found
is enough — any of the resulting paths carries the optimal cost, and the
problem accepts any one of them.

**Complexity:** `O(L * (n + m))` time, `O(L * n)` space, where `L =
targetPath.length`, `n` is the city count, and `m = roads.length`.
