# Solutions — Selling Pieces of Wood

## 2D Dynamic Programming over Piece Sizes

Every strategy for an `h x w` piece reduces to one of three choices: sell it whole for `price[h][w]`, cut it horizontally into `h1 x w` and `(h - h1) x w`, or cut it vertically into `h x w1` and `h x (w - w1)`. Because each cut produces strictly smaller pieces, the optimal revenue `dp[h][w]` satisfies a recurrence over these three options, with the two subpieces solved independently — there is no interaction between the pieces a cut produces. No rotation is allowed, so height and width must be treated asymmetrically.

First the prices are poured into a dense table `price[h][w]` (zero where no shape is sold, keeping the maximum on duplicate shapes even though the constraints promise distinctness). Then `dp` is filled in increasing order of height and width; since a horizontal cut needs rows `h1 < h` and `1 <= h1 <= h/2` (the symmetric `h - h1` cut need not be retried), and a vertical cut needs columns already computed in the current row, every referenced subproblem is ready when it is used. `dp[i][j]` starts at `price[i][j]` so selling whole is the default and cuts must beat it.

The answer `dp[m][n]` is optimal because the recurrence exhaustively enumerates the first cut and, inductively, the optimal continuation of both halves; selling whole is also covered for every subpiece. Cuts are enumerated only up to the midpoint, halving the inner loops without losing any split. Edge cases: shapes with no listed price default to revenue 0 if unsold, tiny pieces `1 x w` or `h x 1` still allow cuts in the other dimension, and unsellable-but-cuttable pieces derive value entirely from their fragments.

**Complexity:** `O(m*n*(m+n))` time, `O(m*n)` space.
