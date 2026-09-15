# Solutions — Analyze Organization Hierarchy

## Recursive CTE Enumerating Manager-Descendant Chains

The single recursive CTE `chain` materializes, for every employee treated as a root, all pairs `(root_id, employee_id, depth)` of that employee's subtree: the anchor selects each employee as their own root at depth 1, and the recursive step joins `Employees` on `manager_id = chain.employee_id` to append every direct report at one level deeper. Everything the problem asks for is an aggregation over these rows, so the query never navigates the tree again.

Three derived tables consume `chain`. `levels` filters the chains rooted at the CEO (the row with `manager_id IS NULL`) to obtain each employee's depth, i.e. the requested level. `teams` groups `chain` by `root_id` and takes `COUNT(*) - 1` as `team_size`, since each root's chain lists the root plus every direct and indirect report. `budgets` groups by `root_id` over rows where `root_id != employee_id`, summing the descendants' salaries; the final select adds the manager's own salary with `e.salary`.

The last join starts from `Employees` and left-joins `teams` and `budgets` so that non-managers (no descendants) get `team_size = 0` and `budget = own salary` via `COALESCE`, rather than dropping out of the result. The required ordering `level ASC, budget DESC, employee_name ASC` is part of the judged answer and is applied exactly in the final `ORDER BY`, which is legal in most SQL dialects because the ordered columns are all output aliases of the final select.

The CTE is re-anchored at every employee (not just the CEO) because `team_size` and `budget` need every manager's descendant set, not only the CEO's; the extra rows cost one chain row per (manager, descendant) pair, i.e. the sum of all subtree sizes.

**Complexity:** `O(n * d)` time, `O(n * d)` space, where `n` is the number of employees and `d` the hierarchy depth (the `chain` CTE holds one row per manager-descendant pair).
