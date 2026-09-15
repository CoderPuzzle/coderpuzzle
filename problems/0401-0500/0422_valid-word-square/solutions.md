# Solutions — Valid Word Square

## Cell-wise symmetry

Saying "the kth row and the kth column read the same string" is saying the
grid mirrors across its own diagonal, cell by cell: for every pair `(i, j)`,
the character at `(i, j)` and the one at `(j, i)` either both exist and are
equal, or both fail to exist. A ragged edge is just absence on one side of
the mirror. The second example passes because where row 3 stops at two
letters, column 3 also holds exactly two letters; a row that ran past the
number of rows would put characters in columns that cannot answer them, and
fails.

The check never builds a column. It walks each row and, for every character
at `(i, j)`, demands that row `j` exist at all and reach at least back to
column `i`, and that its `i`th character match. One broken mirror — a
missing row, a too-short row, a too-long row, a plain character mismatch —
returns false on the spot; a full silent pass means every cell is mirrored
and the sequence is a valid word square.

Each character is visited once and provokes at most one lookup on the far
side of the diagonal, so the whole pass costs the total character count of
the input. Only indices are kept — no transposed copy, no padded grid, no
column strings — so the extra space is constant.

**Complexity:** `O(n)` time (n = total characters), `O(1)` space.
