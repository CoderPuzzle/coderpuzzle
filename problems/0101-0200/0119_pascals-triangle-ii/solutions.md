# Solutions — Pascal's Triangle II

## In-place row build

Only one row is asked for, and every row of the triangle follows from the one above it by the same rule: a 1 at each end, each interior cell the sum of the two cells directly above. So there is no need to keep the triangle — a single array of `rowIndex + 1` ones can be folded forward one row at a time, and after pass `i` its first `i + 1` cells hold row `i` exactly while the untouched tail is still all 1s, the raw material for the rows still to come.

The fold updates the interior cells right-to-left. At the moment `row[j]` is refreshed, `row[j - 1]` has not been written this pass and still holds the previous row's value, so `row[j] += row[j - 1]` performs the two-above sum in place with no second array — a left-to-right scan would have already clobbered its left operand. The outer loop grows the computed prefix from the trivial row 1 to the full row `rowIndex`, which is exactly the row returned; the returned array is the only one ever allocated, which is what the follow-up's `O(rowIndex)` extra-space budget asks for.

The widest row is row 33, whose middle entry C(33, 16) = 1,166,803,110 still fits a signed 32-bit integer, so every cell and every intermediate sum stays inside the 32-bit row the signature already asks for.

**Complexity:** `O(rowIndex²)` time, `O(rowIndex)` space — the returned row itself.
