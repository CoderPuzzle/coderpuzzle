# Solutions — Find COVID Recovery Patients

## First positive, then first later negative, joined back to patients

A patient qualifies exactly when two dated events exist in order: a first
Positive test, and a Negative test strictly after it. The `pos` subquery
groups `covid_tests` by patient and takes `MIN(test_date)` over the Positive
rows — the anchor date. The `neg` subquery then keeps only Negative rows
whose date is greater than that patient's anchor (a correlated `MIN` over
the patient's Positive rows) and groups those to get the first such
negative; the strict `>` is what makes a same-day negative worthless and a
negative taken before the positive never count. Inconclusive rows are never
selected by either half, so they cannot interfere, and a patient with no
qualifying negative simply produces no row in `neg` — the inner join drops
them, which also removes positive-only and negative-only patients.

The two grouped results join back to `patients` to carry `patient_name` and
`age`, and the recovery time is the day difference
`JULIANDAY(first_negative) - JULIANDAY(first_positive)` cast to an integer.
The outer `ORDER BY recovery_time, patient_name` presents rows the way the
statement asks; the judge compares rows as an unordered multiset, so that
ordering is fidelity to the statement rather than a correctness requirement.

**Complexity:** `O(T log T)` time for `T` test rows (the grouping sorts),
`O(P)` space for the per-patient grouped rows.
