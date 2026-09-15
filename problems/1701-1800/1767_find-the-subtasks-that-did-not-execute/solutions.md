# Solutions — Find the Subtasks That Did Not Execute

## Enumerate every subtask, subtract the executed

The answer is a set difference, but only one side of it exists as a
table: `Executed` lists what ran, while the full grid of subtasks each
task was divided into is implied by `Tasks.subtasks_count`. A recursive
CTE materializes that grid — it seeds one row per task at `subtask_id`
`1`, then keeps incrementing `subtask_id` per task for as long as it
stays below that task's own `subtasks_count`, so each task expands into
exactly its labeled subtasks.

The grid is then anti-joined against `Executed`: a `LEFT JOIN` on the
pair `(task_id, subtask_id)`, keeping the rows where the join found
nothing. Every surviving row is a subtask that exists but never
executed, which is precisely the requested report. The `ORDER BY` is
cosmetic — the result is a row set compared order-insensitively, and
the sort only makes eyeballing the output pleasant.

With `T` tasks the grid holds `G` rows, the sum of all
`subtasks_count` values (at most `20` per task). The anti-join looks
each grid row up in `Executed`'s composite primary-key index, and the
final sort adds a logarithmic factor, dominated by the join for
realistic inputs.

**Complexity:** `O(G log G)` time, `O(G)` space.
