# Solutions — Article Views II

## Count distinct articles per viewer per day

The unit is a `(viewer_id, view_date)` pair, and what it must accumulate is
the number of **distinct** articles — the table allows duplicate rows, and
reading the same article twice on one day is still one article. `COUNT
(DISTINCT article_id)` inside a `GROUP BY viewer_id, view_date` computes
exactly that, and `HAVING` keeps the pairs whose count exceeds one.

One more grouping level is then needed: the same viewer may qualify on
several dates, and the output lists each person once. `SELECT DISTINCT
viewer_id` over the surviving pairs collapses the repeats, the alias
presents the column as `id`, and the final `ORDER BY` delivers the ascending
order the statement asks for.

**Complexity:** `O(N log N)` time for the two grouped scans and the sort
over `N` Views rows, `O(N)` space for the grouping sets.
