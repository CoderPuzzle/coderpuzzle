# Solutions — Valid Sudoku

## One pass, seen-set per unit

Validity is purely local: a board fails exactly when some row, some column, or some 3 x 3 box repeats a digit. So the method walks the 81 cells once, carrying twenty-seven seen-sets — nine for the rows, nine for the columns, nine for the boxes — and inserts each filled cell's digit into the three units the cell belongs to. A digit already present in any of the three is a repetition, and the method returns false on the spot; a board that survives all eighty-one insertions is valid.

Empty cells are skipped, because the statement asks only the filled cells to be validated — an all-dot board is trivially valid, and a valid partial board need not be solvable. The box a cell belongs to is computed inline: rows and columns are chunked in threes, so `(row / 3) * 3 + column / 3` numbers the boxes 0 through 8. The per-language ports differ only in the container — hash sets of the cell character in Python, C++, Rust, JavaScript, and TypeScript, `map[string]bool` in Go, and boolean tables indexed by the digit in Java, where twenty-seven hash sets would need awkward generic arrays.

**Complexity:** `O(n²)` time and space for an `n x n` board — eighty-one constant-time set operations when `n = 9`.
