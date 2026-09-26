# Solutions — Check if Word Can Be Placed In Crossword

## Scan maximal open runs

Blocks and board edges are exactly the legal boundaries of a placement, so scan every maximal horizontal and vertical run of cells that are not `'#'`. A run can hold the word only when its length equals the word length; shorter runs do not fit, and longer runs would leave a letter or space directly before or after the placement.

![On the example board with word "abc", the scan finds one maximal run of the word's length — column 1, running edge to edge — and laying abc forward puts a and b on spaces and c on the board's fixed c, so the answer is true.](figures/solution-open-run-scan.svg)

For each correctly sized run, compare its fixed letters with `word` in both directions. A cell containing `' '` accepts either letter, while any lowercase letter must match the corresponding forward or reversed character. The scans use indices rather than splitting rows, so leading, trailing, and consecutive spaces remain intact.

**Complexity:** `O(m * n)` time, `O(1)` auxiliary space.
