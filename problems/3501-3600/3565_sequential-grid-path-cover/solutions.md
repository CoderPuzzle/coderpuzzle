# Solutions — Sequential Grid Path Cover

## Backtracking with parity and connectivity prunes

The walk is a Hamiltonian path with an ordering contract: the cell holding
waypoint `w` may be entered only as the `w`-th waypoint, which turns the
search into a plain depth-first backtracking where each step picks one of at
most four neighbors, marked visited, with the target counter advanced exactly
when the entered cell carries the next expected waypoint value. Any cell
holding `0` or `1` can be the start — the walk may wander through empty
cells before reaching waypoint 1 — so the outer loop tries every such start
in row-major order until one covers all `m · n` cells.

Two prunes collapse the search tree without ever discarding a real solution.
First, a grid is bipartite by cell color `(r + c) mod 2`, and the walk
strictly alternates colors, so after each step the cells left unvisited must
split between the two colors in an exact `ceil`/`floor` ratio dictated by the
current cell's color; any imbalance kills the branch immediately (this alone
refutes every odd-grid start on the minority color). Second, the still
unvisited cells must form one connected region — the remainder of the walk
is a single stroke through them — so a flood fill per node prunes branches
that would strand cells behind the visited wall. With `m, n ≤ 5` the board
has at most 25 cells and the recursion depth is bounded by the same number,
well inside any stack limit.

The first completing walk is returned in visit order as `[row, col]` pairs;
if every start is exhausted the answer is the empty array. Because the
statement accepts any valid path, the deterministic neighbor order (up,
down, left, right) simply fixes which of the valid answers is produced.

**Complexity:** exponential worst case in theory, `O(m · n)` per node with
the two prunes keeping the 5 × 5 board instant in practice; `O(m · n)` space.
