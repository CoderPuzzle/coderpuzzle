# Solutions — Remove All Ones With Row and Column Flips

## Compare every row with the first

After choosing the column flips, every row must become either all zeros or all ones; a row flip can then clear the latter. Therefore each original row must be exactly the first row or its bitwise complement. Check this cell by cell by comparing whether each row has the same equality pattern against its first element as the first row has against its own first element.

![In grid = [[0,1,0],[1,0,1],[0,1,0]], row 1 is the bitwise complement of row 0 and row 2 equals row 0, so the check passes and flipping column 1, then row 1, leaves all zeros.](figures/solution-rows-equal-or-complement.svg)

This condition is also sufficient: flip the columns containing ones in the first row, making that row zero; every other row becomes all zero or all one, and the all-one rows can be flipped.

**Complexity:** `O(m * n)` time and `O(1)` auxiliary space.
