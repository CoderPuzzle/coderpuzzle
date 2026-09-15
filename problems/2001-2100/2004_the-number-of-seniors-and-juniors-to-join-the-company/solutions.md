# Solutions — The Number of Seniors and Juniors to Join the Company

## Cumulative salaries by hiring priority

Within each experience category, hiring the cheapest candidates first gives
the largest possible count. A window sum ordered by `salary` and then
`employee_id` records the cost of every cheapest prefix; the ID tie-break only
makes equal-salary prefixes deterministic. The affordable senior prefix is
counted first, and its salaries are summed to determine the remaining budget.

The same cumulative sums then identify the junior prefix that fits in that
remainder. Two aggregate CTEs always produce one row each, including on an
empty table, and `UNION ALL` labels those fixed rows as `Senior` and `Junior`.

**Complexity:** `O(n log n)` time and `O(n)` space for sorting and evaluating the window sums.
