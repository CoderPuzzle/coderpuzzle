# Solutions — Find Top Scoring Students

## Two double NOT EXISTS gates per student

Qualification is a conjunction of two absence proofs, and each one is the SQL
for "there is no counterexample." The first gate asks: is there a course of
this student's major that they never enrolled in? The inner-inner probe
`en.student_id = s.student_id AND en.course_id = c.course_id` makes
`NOT EXISTS` a membership test — if it fails for every major course, coverage
is complete. Because the requirement binds students to _their_ major's course
list, students whose major offers nothing at all trivially pass: no row
inside can witness a missing course.

The second gate covers the grades side with the same shape, inverted outward:
does there exist any enrollment by this student in an own-major course whose
grade differs from `'A'`? One non-A attempt disqualifies outright — retaking
the course later and scoring A does not undo the earlier attempt, since the
counterexample row still exists. The join to `courses` restricts that check
to own-major enrollments only, so electives outside the student's major are
invisible here (and also to gate one, which never consults them). Both gates
run over an indexed-ish equality lookup per student; the final `ORDER BY`
just emits surviving ids ascending.

**Complexity:** `O(s · (c + e))` time worst case, `O(1)` extra space beyond
scan buffers — for each of the `s` students the probes touch their major's
course list and that student's enrollments.
