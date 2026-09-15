# Solutions — Transpose File

Three ways to read a table sideways, from a cell-at-a-time baseline to
one pass with awk. The rescans shrink by an order of magnitude at each
step: per cell, per column, then never.

## Rescan Every Cell

The buffered file is addressed like a spreadsheet: for each output
column and each row, sed prints that row, cut keeps that column's
field, and the cells concatenate into a line. `${index}p` plus
`cut -d ' ' -f"$column"` makes the intent impossible to miss — and so
does the cost, since one output cell costs a full pass over the file.

The route exists to show the shape of the answer with no tool trickery:
output cell `(i, j)` is input cell `(j, i)`. Everything after this is
bookkeeping reductions of the same double loop.

**Complexity:** `O(rows × columns × characters)` time, `O(file)` space.

## Cut Each Column

The file is still buffered, but each output line is now one pipeline:
`cut -d ' ' -f"$column"` walks every row and keeps that column's field,
and `paste -sd ' '` joins the column into a space-separated line. One
rescan per column instead of per cell — the double loop's inner loop
has moved into a single tool.

**Complexity:** `O(columns × characters)` time, `O(file)` space.

## One Pass, Nested Output

awk reads the table once, storing each field at its `(row, column)`
subscript; the END block then walks the array column-major, printing
row `j`'s cell of column `i` with a space between neighbours and a
newline at the end of each column. The input is read exactly once and
never buffered by the shell — awk holds only the fields.

**Complexity:** `O(rows × columns)` time, `O(rows × columns)` space.
