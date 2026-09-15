# Solutions — Erect the Fence II

## Welzl's Incremental Smallest Enclosing Circle

The minimum-length circular fence is the smallest enclosing circle of the points, and that circle is always pinned by at most three of them: either it is a point of radius 0 (single tree), has two trees as a diameter, or passes through three trees as their circumcircle. Welzl's incremental scheme exploits this: maintain the smallest circle enclosing the points processed so far; when the next point `i` falls outside it, `i` must lie on the border of the corrected circle, so restart with `i` fixed and re-run the same argument one level deeper — first pairing `i` with each earlier point `j` on the border (midpoint circle from `from2`), and, when a still-earlier point `k` escapes that, fixing all three via the circumcircle from `from3`.

`from2` is trivial: center at the midpoint, squared radius a quarter of the squared distance. `from3` solves the perpendicular-bisector linear system for the circumcenter; if the determinant is zero the three points are collinear and the code falls back to the best two-point circle among the three pairs, which is the correct enclosing circle in that degenerate geometry. Enclosure is tested with squared distances plus an epsilon of 10^-7, so points exactly on the border (common with integer coordinates) are treated as enclosed despite floating-point error rather than triggering needless rebuilds.

Precision matters because the judge accepts the answer only within 10^-5: the code translates all coordinates by the first tree before converting to floats, keeping intermediate magnitudes small, then shifts the final center back and takes the square root of the squared radius once at the end. The single-tree case never enters the loops and returns radius 0 directly.

**Complexity:** `O(n)` expected time (`O(n^3)` worst case for adversarial orders, as this version does not shuffle), `O(n)` space.
