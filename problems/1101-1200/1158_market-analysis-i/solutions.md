# Solutions — Market Analysis I

## Left join a filtered order count onto every user

Every user appears in the output exactly once, buyers or not — so the
driving table is `Users`, left-joined to an aggregate of `Orders`. The
aggregate pre-filters to the year that matters (`strftime('%Y', order_date)
= '2019'`, equivalently a date-range predicate) and counts rows per
`buyer_id`; only _buying_ counts, which the grouping key expresses directly
— selling activity never enters the count.

The join must be **left**: an inner join would silently drop the users who
bought nothing in 2019, exactly the rows the example carries with a zero.
`COALESCE(..., 0)` turns the NULL a matchless left join produces into the 0
the format wants, and `favorite_brand` never needs to leave the Users side.
The Items table plays no role in this question — it exists for the sibling
problem that asks about brands.

**Complexity:** `O(U + N)` time for `U` users and `N` orders — one grouped
scan plus one hash join — and `O(U + B)` space for the per-buyer counts of
`B` distinct buyers.
