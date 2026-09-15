# Solutions — Find Top Scoring Students II

## Three correlated probes per student, AND-ed together

Eligibility is a conjunction of four independent facts about one student,
so the query walks `students` once and asks each student its own battery
of correlated subqueries. The mandatory-completion test compares two
counts: the number of `'yes'` courses in the student's major versus the
number of those same courses for which the student owns an enrollment
row graded `'A'` — they match exactly when every mandatory course was
taken and every row taken earns the top letter (a stale non-A row from
a retake keeps the second count's rows honest because a sibling
`NOT EXISTS` guard rejects any bad-grade row outright). The elective
test counts distinct in-major elective course ids and demands at least
two, and the GPA test takes `AVG(GPA)` over all of the student's
enrollment rows regardless of department and requires at least 2.5.

The grade-floor audit is another anti-join: no in-major enrollment row
may exist whose letter is not `'A'` on a mandatory course or outside
`('A', 'B')` on an elective. Enrollments in other majors touch none of
these three probes — they only surface inside the average, which is why
an out-of-major failure can drag a student below 2.5 yet never violates
the letter grades. Because the enum arrives lowercase in the datasets,
every comparison on it goes through `LOWER(mandatory)`. The final
`ORDER BY student_id` orders the survivors ascending; students with no
enrollments fail the elective count naturally, so no special empty-row
handling is needed.

**Complexity:** `O(S · (E + C))` time with `S` students, `E`
enrollments, and `C` courses — each probe scans its table per student —
and `O(E + C)` space for the joins.
