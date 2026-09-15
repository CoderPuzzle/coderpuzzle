# Solutions — Find the Grid of Region Average

## Slide every window once, then average what landed on each pixel

Every candidate region is one of the `(m - 2) * (n - 2)` three-by-three
windows, so the algorithm makes a single pass over window positions. A window
qualifies exactly when all twelve edge-adjacent pairs inside it stay within
`threshold` of each other. Rather than re-testing twelve neighbours per
position, the pair tests are folded into two boolean grids: `calm_h[r][c]`
says row `r` is horizontally calm across columns `c..c+2`, and `calm_v[r][c]`
says column `c` is vertically calm across rows `r..r+2`. A window at `(i, j)`
then qualifies iff three horizontal entries and three vertical entries hold,
and a two-dimensional prefix-sum table supplies each qualifying window's cell
total in constant time.

Each qualifying window contributes its floored average `total / 9` to every
cell it covers: the value is added into a running sum grid and one into a
count grid. The final answer per pixel is that running sum divided by its
count, floored again — this is exactly why Example 1 combines averages 9 and
9.67 as `(9 + 9) / 2`: the floored region values are what get averaged. A
pixel covered by no region keeps its original intensity.

**Complexity:** `O(m * n)` time — constant work per window position plus a
linear combine; `O(m * n)` space for the prefix table and the two accumulator
grids.
