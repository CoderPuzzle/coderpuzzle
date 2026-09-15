# Solutions — Minimum Number of Visited Cells in a Grid

## Row and Column Reachability Heaps

Every move goes strictly right or down, so the grid is a DAG whose
topological order is simply a row-major scan: when a cell is reached, no
future cell can ever feed back into it and its distance is final. Scanning
once in that order turns the search into dynamic programming. The only
question is finding each cell's best predecessor quickly without walking
the whole move range, which can span thousands of cells.

Two lazy min-heaps answer "nearest predecessor" per direction: `rows[i]`
holds `(distance, k)` for the cells already settled in row `i`, and
`cols[j]` holds `(distance, k)` for column `j`. Cell sources stay useful
until the scan index moves past `k + grid[·][k]`, and since that index
only ever grows within a row or column, such exhausted entries pop
forever — total heap traffic is one push and at most one pop per cell.
After the sweeps, the top of each heap is exactly the cheapest currently
reachable source from the left and from above, so taking their minimum
plus one settles the cell. Unreached cells keep their infinity sentinel,
which maps to `-1`; the start seeds both structures with distance 1, and
a single-cell grid is already at the answer.

**Complexity:** `O(m·n·log(m·n))` time, `O(m·n)` space.
