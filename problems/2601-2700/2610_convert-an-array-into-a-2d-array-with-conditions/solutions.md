# Solutions — Convert an Array Into a 2D Array With Conditions

## Place each occurrence at its rank row

Distinctness inside a row means a value's copies must spread across different
rows, and minimality caps the matrix at `f_max` rows (the largest frequency —
no arrangement can do better, and repeating a value row-by-row always fits).
Together these two facts pin down the natural deterministic answer: the
k-th time a value appears, it belongs in exactly row `k` (zero-based), since
its earlier copies have already consumed the strictly earlier rows.

So the whole construction is one streaming pass: keep a counter per value,
append to `rows[counter]`, grow the row list only when that index is brand
new. Rows open exactly as often as some value climbs deeper than before, so
the count closes at `f_max`; no membership tests are ever needed because two
copies of the same value can never share an index. Output sizes are bounded
by 200 elements, so everything fits comfortably in machine ints.

**Complexity:** `O(n)` time, `O(n)` space.
