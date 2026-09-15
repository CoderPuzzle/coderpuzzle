# Solutions — Twisted Mirror Path Count

## Jump-table dynamic programming

The robot only ever stands on empty cells, and every step it takes — plain or
deflected — collapses to one jump whose landing cell depends solely on the
cell it leaves from and the direction it attempts. Two facts make those jumps
tractable. Every deflection moves the robot to a cell one row below or one
column right of the mirror it hit, so a bounce chain strictly increases the
row coordinate of every cell it touches: chains cannot loop, and each jump
always lands in a strictly later row than the cell it starts from. A single
row-major sweep over cells therefore settles every dp value before any of
its descendants reads it.

Resolving a jump naively would walk the mirror chain per query, so the
chains are pre-resolved once. For each mirror cell, store where a robot
finally lands after entering that mirror moving right (it exits downward)
and after entering it moving down (it exits rightward). Because the next
mirror in a chain always lies in a later row or a later column, filling
these two tables in reverse row-major order reads only finished entries,
and each chain is paid for exactly once across the whole grid.

The count itself is then the classic grid walk. `dp[0][0] = 1`; scanning
cells in row-major order, each nonzero `dp[i][j]` is pushed into the landing
cells of its rightward and downward attempted moves — the neighbor directly
when it is empty, otherwise the precomputed bounce target — dropping jumps
whose chain leaves the grid. Every addition is taken modulo `10⁹ + 7`, and
`dp[m - 1][n - 1]` is the answer once the sweep ends.

**Complexity:** `O(mn)` time, `O(mn)` space.
