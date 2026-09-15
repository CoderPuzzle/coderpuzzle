# Solutions — Lonely Pixel II

## Row-identity classes

Rule 2 is what makes this more than a pair of count checks: every row carrying a black pixel in column `c` must be an exact copy of row `r`. Rows therefore interact only through their content — identical rows form an equivalence class, and a column's black pixels are interchangeable as long as they come from one class. Keying each class by its row joined into a string collapses rule 2 to a count: the pixel at `(r, c)` is lonely exactly when column `c`'s black cells all belong to `r`'s class.

The code makes one grouping pass and one distribution pass. The first assigns every row a class id from `classOfKey`, records each class's black count in `classRowCount` — identical rows share a single row count — and tallies `colCount`. The second places every black cell into `blacks[c][k]`, the number of black cells column `c` carries from class `k`. Rule 1 is then pure integer comparison, and the payout is decided per column rather than per pixel: column `c` contributes exactly `target` pixels when `colCount[c] == target`, one class `k` supplies all `target` of them, and that class's rows each hold exactly `target` blacks.

No column is ever paid twice: two classes each supplying `target` blacks would force `colCount[c] >= 2 * target`, past the first check. And since class members are identical, `blacks[c][k] == target` really does mean `target` copies of one row carry the column — rule 2 verbatim, with the contributing rows being precisely the `target` members of `k`, each also passing rule 1 through the two count checks.

**Complexity:** `O(mn)` time, `O(mn)` space.
