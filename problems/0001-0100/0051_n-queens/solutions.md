# Solutions — N-Queens

## Backtracking with Conflict Sets

Placing one queen per row removes row conflicts by construction, so the search only has to worry about columns and diagonals. The state is a partial board built row by row: `backtrack(row)` tries each column `col` in `0..n-1` for the queen of row `row`, recurses on the next row, then undoes the placement — classic depth-first backtracking over column choices.

Conflict checks are `O(1)` thanks to three sets. `cols` holds occupied columns; `diag1` holds `row - col`, which is the same for every cell on one family of diagonals; `diag2` holds `row + col`, constant along the other family. A candidate `(row, col)` is safe exactly when all three values are unseen; if so, the three values are inserted, a row string of dots with a `Q` at `col` is appended to `board`, and the search descends. On return, the additions are popped, restoring the state for the next candidate.

When `row == n`, every row holds a queen and no pair attacks — the completed `board` (copied with `list(board)` so later backtracking cannot mutate it) is recorded as one solution. Because columns are tried in increasing order and rows filled top to bottom, solutions are emitted exactly in the row-by-row, left-to-right order the statement requires. The `n = 1` base case returns the single board `["Q"]` directly, and unsatisfiable branches simply die when no column in some row passes the check.

The search tree has at most `n` choices at each of `n` rows, giving the familiar `O(n!)` upper bound on the work (pruning by the three sets cuts the practical tree down enormously, but worst-case growth is still factorial). Beyond the output, the state is `O(n)`: recursion depth plus three sets and a board of `n` entries each.

**Complexity:** `O(n!)` time, `O(n)` space.
