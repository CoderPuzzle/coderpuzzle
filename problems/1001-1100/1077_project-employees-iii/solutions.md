# Solutions — Project Employees III

## Join to Attach Experience, Filter Against the Per-Project Maximum

Join `Project` to `Employee` on `employee_id` so every assignment row
carries its employee's `experience_years`. A correlated-by-value
subquery computes each project's maximum experience with its own
`Project`/`Employee` join grouped by `project_id`, producing one
`(project_id, MAX(experience_years))` pair per project. Filtering the
outer join's rows with `WHERE (project_id, experience_years) IN
(...)` against that pair set keeps exactly the rows whose experience
matches its own project's maximum — never a different project's — so
a project with a lower ceiling than another can't accidentally lose
its top employee to a global comparison. Because the filter is on the
pair, not on experience alone, every employee tied for the maximum
within a project survives, which is what makes ties come out
correctly: collapsing to a single row per project (an `ORDER BY ...
LIMIT 1`, say) would drop every tied employee but one.

Each `Project` row is read once in each of the two joins and folds
into a per-project accumulator, so with hash grouping the subquery
runs in one linear sweep over the table (sort-based plans add a log
factor); the outer join then re-scans the same rows once more to
apply the per-project filter.

**Complexity:** `O(N)` time and `O(P)` space, for `N` Project rows and
`P` distinct projects.
