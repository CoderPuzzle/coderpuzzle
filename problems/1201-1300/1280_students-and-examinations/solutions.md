# Solutions — Students and Examinations

## Cross join the full grid, then left-join the attendance counts

The result must contain every student-subject pair, including pairs that
never sat an exam — a plain join over `Examinations` can only produce rows
that exist there, so it silently drops Alex's all-zero block. The fix is to
manufacture the complete grid first: `Students CROSS JOIN Subjects` emits
one row per student per subject, and a `LEFT JOIN` onto `Examinations`
matched on both columns attaches each pair's exam rows (or NULL when there
are none). `COUNT(e.student_id)` — counting an exam column, never `*` —
then yields zero for the NULL pairs and the true multiplicity for the rest,
duplicates included, because grouping happens after the left join has
fanned out.

The final `ORDER BY student_id, subject_name` satisfies the statement's
ordering requirement and makes the output deterministic. The same shape
can be written with a subquery of pairs joined to an aggregated
examinations table; at these table sizes the two are interchangeable, and
the single-pass version keeps one grouping instead of two.

**Complexity:** `O(s · u + e)` time for `s` students, `u` subjects, and
`e` examination rows (the grid is `s·u`, each exam row lands on exactly
one cell); `O(s · u)` space for the output.
