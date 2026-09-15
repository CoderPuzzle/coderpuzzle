# Solutions — Delete Columns to Make Sorted III

The deletions choose a set of columns to keep, and what remains of each row
is exactly those columns' characters in their original order. A kept set
works precisely when no row descends between two neighboring kept columns —
`<=` inside a row is transitive, so adjacent agreement is the whole law —
which turns the fewest deletions into a longest-chain search over the
columns and a subtraction at the end.

## Longest Chain of Columns

Say column `i` can be followed by a later column `j` when every row holds
still or rises between them: `strs[r][i] <= strs[r][j]` for all rows `r`.
A kept set survives exactly when each of its columns, in
order, passes that test against its successor, and transitivity inside
each row lifts those adjacent checks to the entire row. The answer is
therefore the column count minus the longest chain under "can be followed
by" — the leftover columns are the deletions.

Compute the chain with `dp[j]`, the length of the longest chain that ends
with column `j` kept. On its own a column forms a chain of length 1;
beyond that, `dp[j]` is one more than the best `dp[i]` over earlier
columns that every row allows to precede `j`. The pair test scans the
rows, and every ordered pair of columns is tested once, so for `n` rows
and `m` columns the sweep performs `n · m²` character comparisons while
carrying a single `m`-entry array. Keeping a running maximum makes the
final subtraction a one-liner.

Deleting every column outside a longest chain leaves each row
non-decreasing, so `m - L` deletions always suffice. Conversely, an
outcome with fewer deletions would keep more than `L` columns, and read in
order those columns would form a chain longer than the longest one — which
cannot exist. The count is both achievable and irreducible.

**Complexity:** `O(n·m²)` time, `O(m)` space.
