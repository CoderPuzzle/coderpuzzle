# Solutions — Replace Employee ID With The Unique Identifier

## Approach: Left join keeps every employee

Every employee must appear exactly once, with their unique id when one exists
and null otherwise — precisely what `Employees LEFT JOIN EmployeeUNI` on the
shared `id` produces: unmatched rows keep all employee columns and receive
nulls for the joined side. Selecting `unique_id` and `name` finishes the job.

**Complexity:** `O(E + U)` time for `E` employees and `U` unique-id rows (the
hash join), `O(E)` output.
