# Solutions — NPV Queries

## Left join on the composite key

The answer's rows are exactly the `Queries` rows, each decorated with the
npv that `NPV` holds for that `(id, year)` pair — or 0 when it holds
nothing. That shape is a textbook left join: `Queries q LEFT JOIN NPV n
ON q.id = n.id AND q.year = n.year` keeps every query row and attaches
the matching npv where one exists.

The only subtlety is the miss case: an unmatched row carries a null in
the joined `npv` column, and the statement wants 0 there instead.
`COALESCE(n.npv, 0)` substitutes exactly when the join found nothing,
and leaves a stored 0 (or a negative npv) untouched, so both kinds of
zero are reported identically.

Because `(id, year)` is `NPV`'s primary key, the join multiplies no
rows — each query matches at most one npv row — and the output cardinality
is precisely the query count. Row order is free ("in any order"), which
the multiset comparison accepts.

**Complexity:** `O(Q + N)` for a hash join over the two tables, `O(Q)`
space for the result.
