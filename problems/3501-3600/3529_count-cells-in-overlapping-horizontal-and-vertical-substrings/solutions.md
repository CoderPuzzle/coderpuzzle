# Solutions — Count Cells in Overlapping Horizontal and Vertical Substrings

## KMP over both flattens, difference-array intersection

The two read orders are just two linear strings of length m·n: reading the
grid left-to-right with row wrap is the row-major flatten, and reading top-
to-bottom with column wrap is the column-major flatten. A horizontal (resp.
vertical) substring equal to `pattern` is exactly an occurrence of `pattern`
in one of those strings, and the cells it covers are the flatten positions
`start .. start + |pattern| - 1` decoded back through the same order —
row-major position `p` is cell `(p / n, p % n)`, column-major position `p` is
cell `(p % m, p / m)`. The wrap rules simply mean occurrences may not pass
the end of the flatten, i.e. `start <= m*n - |pattern|`, which substring
search enforces on its own.

So the algorithm is: build both flatten strings, find every occurrence of
`pattern` in each with KMP (the failure function makes the scan linear even
when the pattern is highly self-overlapping), and turn each occurrence into a
range mark over its flatten's positions. A difference array per direction
plus one prefix pass yields, for every position of each flatten, whether at
least one occurrence covers it.

Finally each cell is counted once, checking both of its flatten positions:
cell `(r, c)` counts exactly when row-major position `r*n + c` is
horizontally covered and column-major position `c*m + r` is vertically
covered. Every step is linear in the grid size plus the pattern length, and
the marks/counts stay far inside 32-bit range (at most m·n ≤ 10⁵ covered
cells).

**Complexity:** `O(m·n + |pattern|)` time, `O(m·n)` space.
