# Solutions — Sequentially Ordinal Rank Tracker

## Partition the ranking with two heaps

Keep the already-requested best prefix in one heap whose root is the worst location in that prefix, and keep every other location in a second heap whose root is its best location. On `add`, insert into the prefix heap and move its worst item to the remaining heap, preserving the prefix size while allowing a newly added high-ranked location to cross the boundary.

On `get`, move the best remaining location into the prefix. The prefix grows by one, and its worst item is exactly the newly requested rank, ordered by higher score first and lexicographically smaller name on ties.

**Complexity:** `O(log A)` time per operation and `O(A)` space after `A` additions.
