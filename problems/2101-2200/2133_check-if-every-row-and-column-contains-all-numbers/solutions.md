# Solutions — Check if Every Row and Column Contains All Numbers

## Track values in paired rows and columns

For each index, scan its row and its column together while maintaining separate seen arrays. If either scan encounters a value already seen in that row or column, the matrix cannot contain every number exactly once and is invalid.

Every entry is guaranteed to lie from `1` through `n`. Therefore a length-`n` row or column with no duplicate automatically contains every required number, so passing all scans proves validity.

**Complexity:** `O(n²)` time and `O(n)` auxiliary space.
