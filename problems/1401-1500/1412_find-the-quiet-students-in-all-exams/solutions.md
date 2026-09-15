# Solutions — Find the Quiet Students in All Exams

## Exclude the per-exam extremes

The definition has two halves, and each maps to a set of student ids. A
student must have taken at least one exam — their id appears somewhere in
`Exam` — and must never, in any exam they took, hold that exam's highest
or lowest score.

The second condition becomes a set of disqualified ids built in one
grouped pass: a subquery groups `Exam` by `exam_id` and produces each
exam's `MAX(score)` and `MIN(score)`; joining `Exam` back to that summary
flags every row whose score equals its exam's extreme, and the flagged
rows' `student_id`s form the disqualified set. Ties are handled by
construction — equality with the extreme is what disqualifies, so two
students sharing the top score are both flagged.

The final `SELECT` walks `Student` and keeps exactly the ids that appear
in `Exam` but never in the disqualified set: `IN (SELECT DISTINCT
student_id FROM Exam)` enforces the took-at-least-one-exam requirement
(and silently drops students who never sat an exam), while `NOT IN`
against the flagged ids removes anyone who was ever an extreme scorer.
Ordering by `student_id` finishes the contract.

**Complexity:** `O(E)` to scan and group `Exam` plus `O(S)` for the final
filter, with a hash-friendly `NOT IN` evaluation; `O(S + E)` space for
the sets.
