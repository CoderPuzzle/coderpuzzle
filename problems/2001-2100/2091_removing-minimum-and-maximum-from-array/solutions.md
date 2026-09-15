# Solutions — Removing Minimum and Maximum From Array

## Compare the three deletion patterns

Find the indices of the minimum and maximum values and order them as `left < right` (for a singleton they coincide). Removing both from only the front costs `right + 1`, while removing both from only the back costs `n - left`.

The remaining possibility removes the left extremum from the front and the right extremum from the back, costing `left + 1 + n - right`. Every legal sequence has one of these three forms, so their minimum is optimal.

**Complexity:** `O(n)` time and `O(1)` auxiliary space.
