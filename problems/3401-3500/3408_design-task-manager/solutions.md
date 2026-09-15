# Solutions — Design Task Manager

## Lazy Max-Heap plus Task Map

`execTop` ranks tasks by `(priority, taskId)` with both components
descending — a max-heap ordered by that pair is a perfect fit. What makes the
problem interesting is that `edit` and `rmv` (and `execTop` itself) remove or
rewrite exactly one task, and heaps cannot delete an arbitrary entry.

The `TaskManager` class therefore never deletes. A hash map from `taskId` to
the live `(priority, userId)` is the single source of truth: `add` writes it
and pushes a heap entry, `edit` rewrites the priority and pushes a fresh
entry, `rmv` simply erases the map entry. Every heap entry whose task is
absent from the map, or whose priority disagrees with the map, is garbage —
and garbage is only ever discarded when it gets in the way.

`execTop` peeks the top and pops while it fails that validity check; the
first survivor is the true maximum (the heap order is total, so nothing below
it can beat it). The survivor's task is removed from the map and its user is
returned; `-1` falls out naturally when the heap drains. Each pushed entry is
popped at most once, so the cleanup amortizes into the pushes, and the map
keeps every check constant-time.

Both the Python and Java canonical solutions implement exactly this scheme
(the Java one stores `long[] {priority, taskId, userId}` triples so
priorities up to `10⁹` compare safely).

**Complexity:** `O(log n)` per `add`/`edit`/`execTop`, `O(1)` per `rmv`,
`O(n)` space.
