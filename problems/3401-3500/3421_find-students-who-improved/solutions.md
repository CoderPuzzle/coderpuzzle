# Solutions — Find Students Who Improved

## Group by pair, then join back the two endpoint rows

"First" and "latest" are keyed by `exam_date`, not by row order, so the
query starts by collapsing each `(student_id, subject)` pair to its two
endpoint dates: a `GROUP BY` subquery emits `MIN(exam_date)`,
`MAX(exam_date)`, and `COUNT(DISTINCT exam_date)` per pair. The dates are
`YYYY-MM-DD` strings, so their ordinary string order is the chronological
order — `MIN` and `MAX` on the text column pick the first and last exam
directly, and because `(student_id, subject, exam_date)` is the primary
key exactly one score row sits on each endpoint date.

The outer query then joins the base table twice — once on the first date
(`f`), once on the last date (`l`) — to fetch the two scores the result
must show. Filtering happens in the `WHERE` clause: `dates >= 2` enforces
"exams on at least two different dates", and `l.score > f.score` enforces
"latest strictly higher than first". An equal or dropping pair drops out,
and so does any pair with a single exam, where `first_date` and
`last_date` would coincide. The final `ORDER BY student_id, subject`
presents the rows in the required ascending order.

**Complexity:** `O(S log S)` time for `S` score rows (grouping plus the
presentation sort), `O(P)` space for the `P` distinct student-subject
pairs.
