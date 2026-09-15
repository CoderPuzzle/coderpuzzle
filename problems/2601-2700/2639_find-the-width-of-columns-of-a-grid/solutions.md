# Solutions — Find the Width of Columns of a Grid

## Count digits, take column maxima

A column's width is decided by its most "expensive to print" integer, so the
scan is simply one running maximum per column. The only subtlety is what
"length" means: the decimal digit count of the magnitude, plus one extra
character whenever the value is negative for the sign. Repeatedly dividing by
10 until nothing remains counts those digits in closed arithmetic — no string
conversion needed — and starting from 0 keeps zero itself one character wide.

The loop walks the matrix row by row while updating every column's maximum,
which touches each cell exactly once and writes each answer slot at most once
per row. Values are bounded by `10⁹` in magnitude, so eleven characters is the
widest any single integer can reach (`-1000000000`), comfortably inside a
32-bit return even though widths themselves are tiny counts.

Every matrix in the constraints is rectangular and non-empty (`1 <= m, n`), so
seeding the result from `grid[0]`'s width never reads out of bounds.

**Complexity:** `O(m * n)` time, `O(n)` space for the answer.
