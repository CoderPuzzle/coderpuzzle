# Solutions — Remove All Ones With Row and Column Flips

## Compare every row with the first

After choosing the column flips, every row must become either all zeros or all ones; a row flip can then clear the latter. Therefore each original row must be exactly the first row or its bitwise complement. Check this cell by cell by comparing whether each row has the same equality pattern against its first element as the first row has against its own first element.

This condition is also sufficient: flip the columns containing ones in the first row, making that row zero; every other row becomes all zero or all one, and the all-one rows can be flipped.

**Complexity:** `O(m * n)` time and `O(1)` auxiliary space.
