# Solutions — Check if There Is a Valid Parentheses String Path

## Balance-set dynamic programming over the grid

Every path is a sequence of '(' and ')' characters, and a parentheses string
is valid exactly when the running balance — open minus close — never dips
below zero and returns to zero at the end. Moves only go down or right, so
the grid is scanned row-major and each cell records the set of balances with
which it can be reached. The cell `(0, 0)` starts the DP with balance `1`
when it holds '('; a ')' there ends the search immediately, since a path
that begins with a close bracket can never be valid.

From a cell at balance `b`, each of the two forward moves produces `b + 1`
or `b - 1` depending on the character of the destination cell, and only
non-negative results are kept — a negative balance means the prefix is
already unrecoverable. The move is applied to every balance already present,
so the set at a cell is the union of all balances its predecessors could
reach. With at most `m + n - 1 <= 199` characters per path, the balance never
leaves the range `0..199`, which keeps every set small.

After the scan, the answer is whether the bottom-right cell can be reached
with balance `0`. The DP is purely iterative and never revisits a cell, so
large 100 x 100 grids are handled in bounded time regardless of recursion
depth.

**Complexity:** `O(m * n * (m + n))` time, `O(m * n * (m + n))` space.
