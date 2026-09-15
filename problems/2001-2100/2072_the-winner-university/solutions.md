# Solutions — The Winner University

## Compare the two excellent-student counts

Each scalar subquery counts the students whose score meets the inclusive `90` threshold. A `CASE` expression compares those two one-value results: the larger count selects its university, while equality selects `No Winner`. Keeping the counts inside one `SELECT` guarantees exactly one output row, including when neither university has an excellent student.

Both tables are scanned only to count qualifying rows, and the query stores only the two aggregate values. If each university has `n` students, the work is linear in the total number of rows.

**Complexity:** `O(n)` time, `O(1)` extra space.
