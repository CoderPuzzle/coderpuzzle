# Solutions — Delete Duplicate Emails

## Keep the smallest id per email

The judged output is the post-deletion `Person` table: exactly one row per distinct email — the copy with the smallest id — with order irrelevant. `(SELECT MIN(id) FROM Person GROUP BY email)` computes the survivor set directly: `GROUP BY email` collapses each distinct email into one group, and `MIN(id)` picks that group's smallest id. Filtering the outer scan with `id IN (...)` keeps precisely those rows — `id` is the primary key, so no id leads two groups, and the membership test selects the min-id copy of every repeated email while leaving every unique email's only row untouched.

The form is the post-state itself rather than a simulation of the mutation: the returned rows are exactly what `DELETE FROM Person WHERE id NOT IN (SELECT MIN(id) FROM Person GROUP BY email)` would leave behind. Equivalent shapes state the same invariant per row — the correlated `WHERE id = (SELECT MIN(id) FROM Person p2 WHERE p2.email = Person.email)` re-derives each row's group minimum at the cost of one aggregation per row, and `MIN(id) OVER (PARTITION BY email)` reaches the same keep-set through a window pass — but the grouped `IN` form needs no per-row work.

`GROUP BY email` hashes the emails in one aggregation pass and the outer scan performs one membership test per row; with `P` rows in `Person` and `D` distinct emails, only the `D` group minima are materialized.

**Complexity:** `O(P)` time, `O(D)` space.
