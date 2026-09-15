# Solutions — Flatten 2D Vector

## Two coordinates, repaired lazily

The iterator holds nothing but the vector itself and two integers: `row`,
which row the walk is in, and `col`, how far into that row it has served.
Construction does no work at all — no flattened copy is built, and that
restraint is the whole problem: an implementation that pre-flattens the
input answers every call correctly but pays `O(n)` time and space up front
for an iterator that may never be drained. The lazy version keeps the
coordinates off live elements between calls and only ever moves them when
a call forces the issue.

`hasNext` owns the movement. Its loop advances `row` past every row the
column pointer has exhausted — a row that was empty from the start, or one
already fully served by `next` — zeroing `col` as each new row is entered,
and reports whether any row with elements remains. Because that repair
runs before anything reads, `next` can simply call `hasNext`, read
`vec[row][col]`, and step `col` forward, with no special cases anywhere:
after the repair the coordinates are guaranteed to sit on a live element.
The repeated `hasNext` before each `next` costs nothing extra either —
once the coordinates are valid the loop body never runs, so an
already-repaired state is a constant-time check.

Empty rows are what the repair exists for, and they can cluster anywhere:
leading rows (the walk skips them before the first element), trailing rows
(the final `hasNext` skips them to answer `false`), or interleaved ones
(each is crossed the moment its predecessor runs dry). An entirely empty
`vec`, even the zero-row vector, never violates anything — the loop leaves
`row` at the end and every query reports `false`.

**Complexity:** `O(1)` construction; `next` and `hasNext` amortized `O(1)`
(the row pointer only moves forward, across at most `vec.length` rows in
total); `O(1)` extra space beyond the input.
