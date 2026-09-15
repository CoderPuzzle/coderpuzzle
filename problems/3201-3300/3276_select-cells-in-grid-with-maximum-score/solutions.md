# Solutions — Select Cells in Grid With Maximum Score

## Bitmask dynamic programming over rows

Only two facts about the grid matter: which values exist, and for each value, the set of rows containing it. The column of a cell is irrelevant because a selection merely needs one cell per row with all-distinct values, so the input compresses into value_rows, a map from value to a bitmask of its rows. With at most 10 rows the row usage fits in a mask, and dp[mask] is the best score achievable having already consumed exactly the rows in mask.

Values are processed in descending order. For each value, the next table starts as a copy of the current one (not taking this value), and for every reachable mask each still-free row containing the value offers the transition dp[mask | bit] = max(..., dp[mask] + value). Because the transitions all read the pre-update dp, a value can be selected at most once — the uniqueness constraint on values — and starting from the largest values means every candidate first selection is considered at its best.

The answer is the maximum over all masks, since the best selection uses some subset of the rows; the empty mask seeds dp with 0, and positive grid values ensure any real selection beats it. Distinct values are bounded by 100, rows by 10, giving at most 100 · 1024 masks each scanning at most 10 free-row bits.

**Complexity:** `O(V · 2ⁿ · n)` time (V = distinct values, n = rows), `O(2ⁿ)` space.
