# Solutions — Highest Grade For Each Student

## Rank enrollments per student, keep the first

The query first ranks each student's enrollments with a window function:
`ROW_NUMBER() OVER (PARTITION BY student_id ORDER BY grade DESC, course_id)`
numbers the rows within one student from 1 upward, sorted so the highest
grade comes first and, among equal grades, the smaller `course_id` comes
first. That single ORDER BY key is the whole tie-break rule stated by the
problem, folded into the ranking.

The outer query keeps exactly the row numbered 1 from every partition and
orders the survivors by `student_id`. Because the ranking is decided inside
each student's partition, the outer sort is a total order — one output row
per student — so the result is deterministic.

**Complexity:** `O(N log N)` time for the per-partition sort over `N`
enrollment rows, `O(N)` space for the ranked intermediate.
