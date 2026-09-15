# Solutions — Find Students with Study Spiral Pattern

The pattern rule reduces to two aggregate facts about a student's study
history. First the sessions must be split at every gap longer than two days:
the "consecutive dates" clause only lets sessions within the same contiguous
run reinforce each other, and a run that breaks apart is never glued back
together. Second, within one run the student must have studied at least three
distinct subjects and must have enough total sessions to fit two full passes
of that subject set — the "at least 2 complete cycles" clause, expressed as
`session_count >= 2 * distinct_subjects`.

## Window a contiguous run, then keep blocks with two full cycles

Each session is tagged with the number of days since the student's previous
session, using `LAG` over the date-ordered partition; a running `SUM` of the
"gap > 2" markers then numbers the contiguous blocks, so every session whose
previous session is more than two days back starts a new block id. Grouping
by student and block id collapses each run into its `COUNT(*)`,
`COUNT(DISTINCT subject)`, and `SUM(hours_studied)`, and the `HAVING` clause
keeps exactly the blocks that are study spirals: at least three distinct
subjects and at least twice as many sessions as subjects.

A student may own several qualifying blocks, so a `ROW_NUMBER` per student
over `cycle_length DESC, total_hours DESC` picks the single block that
defines the reported row — the longest cycle, with the highest study hours
breaking a tie. Joining back to `students` restores the name and major, and
the final ordering mirrors the required `cycle_length DESC,
total_study_hours DESC` output, with `student_id ASC` as a stable tiebreaker
for rows that agree on both; the judge compares rows as an unordered
multiset, so the ordering is fidelity to the statement rather than a
correctness requirement. The hours total is cast to REAL before it leaves
the query so every judge row carries the decimal value the statement shows.

**Complexity:** `O(m log m)` time, `O(m)` space (m study-session rows).
