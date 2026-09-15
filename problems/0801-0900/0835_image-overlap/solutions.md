# Solutions — Image Overlap

A translation slides all the 1 bits of one image by one shared vector, so two
1-cells can be brought onto each other only by the one shift equal to their
difference — and the overlap a shift achieves is just the number of 1-cell
pairs whose difference it is. Counting pair differences in a hash map scores
every candidate shift in a single pass over the pairs.

## Count shift deltas over pairs of 1-cells

Collect the 1-cells of `img1` into a list `A` and of `img2` into `B`. Shifting
`img2` by `(dr, dc)` carries its cell `b = (i2, j2)` to `b + (dr, dc)`, so
that shifted cell coincides with `img1`'s cell `a = (i1, j1)` exactly when
`a - b = (dr, dc)`. Each ordered pair `(a, b)` therefore votes for the one
shift that lays `b` onto `a`, and the overlap achieved by any shift is
precisely the number of votes it receives — the `(2n-1)²` shifts nobody votes
for score 0. Erasure at the borders needs no separate handling: a vote's
shift maps one in-bounds cell exactly onto another, and whatever else it
pushes out of the grid simply contributes nothing.

The implementation packs each delta as `dr * 100 + dc`, injective because
components lie in `[-(n-1), n-1] = [-29, 29]` while the column term stays
within `(-50, 50)`. A hash map accumulates one count per packed delta, and
the answer is the largest count — `0` when the map is empty, which is exactly
the case of an image with no 1 bits. Sparse inputs cost only `|A|·|B|` pair
steps; even the densest `30 x 30` pair of images stops at 810,000 increments.

**Complexity:** `O(n⁴)` time, `O(n²)` space.
