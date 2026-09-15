# Solutions — Number of Corner Rectangles

## Column-pair counting across rows

Every corner rectangle picks two rows and two columns, with a `1` at all
four crossings. The choice factorizes: fix which two columns a rectangle
stands on, and the rows that can serve as its top and bottom are exactly
the rows holding a `1` in both columns. So a rectangle is nothing more than
a column pair met twice — once by each of two rows — and counting rectangles
is counting, for every column pair, how many pairs of rows show it.

Scan the rows top to bottom carrying one hash counter keyed by column pair.
For the current row, take every pair of columns that both hold a `1`; the
counter's entry for that pair is the number of earlier rows that already
showed it, and each of those rows closes exactly one new rectangle with the
current row as its base. Add that many, then bump the entry. Summed over the
scan, every rectangle is charged once — at its lower of the two rows — and
nothing else is ever charged, since any two rows sharing fewer than two
columns form no rectangle at all. Only the corners matter, so the cells
between the four `1`'s are never inspected; interior values are irrelevant
by the statement's own rule.

A row with `k` ones contributes `C(k, 2)` counter operations, bounding the
whole scan by the pairs of `1`-columns across all rows — at most `n` choose
2 per row. The counter holds at most one entry per column pair.

**Complexity:** `O(m·n²)` time, `O(n²)` space.
