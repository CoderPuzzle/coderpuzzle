# Solutions — Design a Todo List

## Indexed Task Store

Every added task gets its sequentially assigned id and is appended once
to a single store (a vector indexed by `id − 1`); the record carries its
owner, description, due date, tag list, and completion flag.
`completeTask` flips that flag only when the stored owner equals the
caller's id and the task is still open, which covers unknown ids, wrong
owners, and repeated completions in one guard.

The two getters scan the store, keep entries whose owner matches and are
not completed — additionally requiring tag membership for the filtered
variant — and sort the survivors by their unique due dates before
returning descriptions. Since all due dates are unique, ordering is
total; ties never arise. With at most 100 calls per method and at most
100 live tasks, scanning and sorting per query is trivially inside
limits, so no incremental index is warranted.

**Complexity:** `addTask`/`completeTask` run in `O(1)` plus copy costs;
each getter runs `O(m + m log m)` time for the user's `m` tasks,
`O(m)` space.
