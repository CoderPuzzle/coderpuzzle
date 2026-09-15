# Solutions — Find Cutoff Score for Each School

## Group by school, take the minimum qualifying score

A school's answer is determined entirely by the `Exam` rows whose
`student_count` fits inside its `capacity`: among those rows it wants the
largest `student_count`, and among rows sharing that count it picks the
smallest `score`. The join is therefore `LEFT JOIN Exam e ON
e.student_count <= s.capacity` — it keeps every school even when no row
qualifies, and it pairs each school with exactly the candidate scores it
may announce. Aggregating with `GROUP BY s.school_id` then reduces each
group to a single `score`.

The key simplification comes from the problem's guarantee that the `Exam`
table is logically correct: a higher score always has the same or a
smaller `student_count`. That makes `student_count` non-decreasing as
`score` decreases, so within any school's group the smallest `score` is
also the score with the largest `student_count` — the very row the school
wants, with count-ties already resolved toward the smaller score. Hence
`MIN(e.score)` is the exact answer, and no window function or
`ORDER BY ... LIMIT 1` subquery is needed. A school whose capacity is
below every `student_count` produces an all-`NULL` group; `COALESCE(..., -1)`
turns that into the required `-1`.

Because `school_id` is unique and every group aggregates to one row, the
query emits exactly one `(school_id, score)` row per school. The join
scans `Schools × qualifying Exam rows`, and the grouping is computed by a
hash aggregate, so the cost is bounded by the sizes of the two tables.

**Complexity:** `O(|Schools| + |Exam| + rows_in_join)` time, `O(rows_in_join)` space.
