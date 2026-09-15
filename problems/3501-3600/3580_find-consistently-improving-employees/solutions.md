# Solutions — Find Consistently Improving Employees

## Window-Rank Recent Reviews

The whole contract lives in each employee's three most recent rows of
`performance_reviews`, so the first pass ranks reviews per employee with
`ROW_NUMBER() OVER (PARTITION BY employee_id ORDER BY review_date DESC)` —
recency 1 is the newest review — and keeps only `recency <= 3`. The second
pass re-orders those survivors oldest-to-newest and applies `LEAD(rating)`,
so each rating sits next to the rating that follows it in time: the two
differences inside a three-review window are exactly the "each review
better than the previous" test, and `MIN(next_rating - rating) > 0` requires
both to be positive. The newest row's `LEAD` is `NULL`; SQLite aggregates
ignore `NULL`, so it never spoils the minimum.

One grouped pass then finishes the job. `COUNT(*) = 3` within the window
enforces the "at least three reviews" rule, because the ranked CTE only
carries `min(3, review count)` rows per employee, and with the strict
increase already established `MAX(rating) - MIN(rating)` is necessarily
newest minus oldest — the improvement score. Joining `employees` supplies
the name, and the final `ORDER BY` presents the rows by descending score
with the ascending-name tie-break; the judge compares rows as an unordered
multiset, so that ordering is fidelity to the statement rather than a
correctness requirement.

**Complexity:** `O(R log R)` time for `R` reviews (the ranking sorts each
employee's reviews), `O(R)` space.
