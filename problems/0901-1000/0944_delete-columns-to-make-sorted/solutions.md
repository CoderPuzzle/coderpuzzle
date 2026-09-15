# Solutions — Delete Columns to Make Sorted

The grid hides a decomposition: sortedness is not a property of the grid
as a whole but of each column alone. A column survives exactly when no
character drops below the one above it, and nothing happening in another
column can change that verdict — so the answer is a tally of columns that
fail one local test, performed in place over the given array.

## Independent Column Scan

Walk the grid column by column. Within a column, compare each adjacent
pair of rows from top to bottom; the first pair whose lower character is
smaller than the upper one condemns the column, so the scan of that
column stops and the deletion count gains one. A column whose adjacent
pairs never decrease survives untouched — note that a pair of equal
characters never condemns, since non-decreasing order already holds
there. The early break matters for cost only, never for the verdict: one
decrease is enough to force the deletion, and no later pair in the same
column can undo it.

Why this count is also the minimum: every column's fate is independent.
Deleting exactly the condemned columns leaves a grid whose every column
is sorted, while any condemned column that is kept carries its decrease
forever — a decrease inside a column cannot be repaired by deleting a
different column. The deletions are therefore forced one by one, and the
tally is both achievable and irreducible. The scan needs only a counter
and two indices beyond the input itself.

**Complexity:** `O(C)` time, `O(1)` space.
