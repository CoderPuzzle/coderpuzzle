# Solutions — Modify the Matrix

## Replace with column maximums

Every `-1` must become the largest value of its own column. Because each
column is guaranteed at least one non-negative element, the plain column
maximum can never be the `-1` sentinel itself, so no special handling of
empty or all-negative columns is needed.

The code builds `answer` as a copy of `matrix`, then works one column at a
time: it scans the column for its maximum and makes a second pass over that
same column, overwriting each `-1` cell with the value just found. Columns
without any `-1` simply copy through unchanged, and non-negative cells are
never touched.

**Complexity:** `O(m * n)` time, `O(1)` extra space beyond the returned copy.
