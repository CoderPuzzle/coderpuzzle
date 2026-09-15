# Solutions — Find the Team Size

## Window count partitioned by team

Every employee needs the size of the team they belong to, which is exactly a count of rows grouped by `team_id` — but the count must appear alongside every original row rather than collapsing the group. A window function does both in one pass.

`COUNT(*) OVER (PARTITION BY team_id)` computes, for each row, the number of rows sharing that row's `team_id` without reducing the result set, so each employee row survives untouched with its team size attached. No join or subquery is needed, and the statement allows any output order, so no ordering clause is required.

The window pass reads every row of the table once and holds no materialized grouping structure beyond the partition, so the work is linear in the number of employees.

**Complexity:** `O(E)` time and `O(E)` space where `E` is the number of employees.
