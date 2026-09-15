# Solutions — Largest Submatrix With Rearrangements

## Consecutive-Ones Heights with Per-Row Sorting

Because entire columns may be reordered, a submatrix of all ones is characterized only by which columns it uses, not where they stand: for a fixed bottom row, the best strategy is to pick the columns with the tallest runs of consecutive ones ending at that row and let the rearrangement place them side by side. So the problem reduces, row by row, to a histogram question — what is the largest rectangle whose height is at least `h` — answered by sorting the row's heights.

The code maintains `heights[j]`, the number of consecutive ones ending at the current row in column `j`, incremented when `row[j] == 1` and reset to 0 otherwise. For each row it sorts the height array in non-increasing order; after sorting, `ordered[i]` is the `(i+1)`-th largest height, and a submatrix of width `i + 1` with all heights at least `ordered[i]` exists exactly when the top `i + 1` columns are chosen. The candidate area `ordered[i] * (i + 1)` is evaluated for every position, and the loop breaks at the first zero height since the descending order guarantees all following heights are zero too.

Correctness rests on the exchange argument that only the multiset of column heights at a row matters: any all-ones submatrix bottomed at that row uses some set of columns, and replacing any of them by a taller column keeps it all ones (heights only constrain from the bottom upward, and a taller run contains every shorter one). Taking the maximum over all rows and widths therefore covers every submatrix.

**Complexity:** `O(m n log n)` time, `O(n)` space.
