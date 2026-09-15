# Solutions — Sort the Students by Their Kth Score

## Sort Rows by One Column

The problem reduces to one comparison-based sort of the rows: each
student's rank depends only on their single entry in column `k`, so the
comparison key for a row is a constant-time index into it. Sorting rows
descending on that key arranges the whole matrix as requested without
ever touching the values inside any row — exam columns ride along with
their student intact, which is exactly why the matrix must be sorted by
reference to whole rows rather than reorganized cell-wise.

The statement's guarantee that all entries are distinct removes every
tie from consideration: two different rows can never share a column-`k`
value, so the descending order is unique and no sort-stability reasoning
is needed anywhere (relevant for runtimes whose library sorts are
unstable). Row swaps are O(1) moves of references or small headers, so
the dominant costs are the `O(m log m)` comparisons plus `O(m · n)` work
to materialize the returned copy. Values stay ≤ `10⁵`, comfortably
inside 32-bit arithmetic everywhere.

**Complexity:** `O(m log m)` time (plus `O(m · n)` to produce the
matrix), `O(m · n)` space.
