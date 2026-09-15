# Solutions — Cells in a Range on an Excel Sheet

## Columns outer, rows inner

Parse the four coordinates straight out of the five-character string,
then double-loop: the column letter advances in the outer loop and the
row digit in the inner one, which emits cells already in the required
column-major order. No sorting is needed afterward.

**Complexity:** `O((c2 - c1 + 1) * (r2 - r1 + 1))` time (the output
size), `O(1)` extra space beyond the output.
