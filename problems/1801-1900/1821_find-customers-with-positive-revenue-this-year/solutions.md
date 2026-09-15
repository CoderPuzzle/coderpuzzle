# Solutions — Find Customers With Positive Revenue this Year

Each row of `Customers` carries one customer's revenue for one year, keyed by
`(customer_id, year)`, and the question is the plainest possible filter: which
customers have a strictly positive `revenue` in the year `2021`.

## Filter on year, then on sign

The query keeps exactly the rows whose `year` equals `2021` and whose
`revenue` is greater than zero, and projects the single `customer_id` column.
Both predicates are load-bearing: the year predicate excludes the same
customer's other years (the example's customer `3` appears only in `2018` and
`2016` and therefore never surfaces), and the strict inequality excludes zero
alongside the negative revenues — a customer whose `2021` row reads `0` is not
reported, since zero is not positive. Because `(customer_id, year)` is the
primary key, a customer owns at most one `2021` row, so the result never
repeats a customer and no `DISTINCT` is needed.

Rows come back in any order — the comparison treats the result as a set of
one-column rows, and the engine is free to use whatever order its scan
produces. An empty `Customers` table, or one with no `2021` rows at all,
yields the empty result.

**Complexity:** `O(n)` time, `O(1)` extra space.
