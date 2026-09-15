# Solutions — Friday Purchase III

## Generate the four Fridays, cross with the two memberships, left join spend

The result is a dense grid: every one of November 2023's Fridays paired with
every target membership, zero-filled where nothing qualifies. A recursive CTE
walks `2023-11-01` to `2023-11-30` day by day (`DATE(d, '+1 day')`), keeps
only rows whose `%w` weekday code is `5` (Friday in SQLite's encoding), and
derives each Friday's occurrence number as `(day - 1) / 7 + 1`, which maps
Nov 3/10/17/24 onto weeks 1–4 exactly as the statement numbers them. A tiny
two-row membership CTE supplies the column values.

The Purchases side reduces to one pre-aggregated row per
(`purchase_date`, `membership`): `Purchases` joined to `Users` on `user_id`
keeps only Premium/VIP buyers — Standard activity (and any non-Friday date,
later dropped by the join) vanishes before grouping. Finally the full grid of
Fridays × memberships left joins those aggregates; an unmatched combination
survives with `SUM = NULL`, which `COALESCE(..., 0)` renders as the demanded 0. Ordering by week then membership ascending produces the required layout —
`'Premium' < 'VIP'` lexicographically, so a plain text sort suffices.

**Complexity:** `O(P + U + G)` time, `O(G)` space — `P` purchases joined once
to their users, `U` users filtered, and the constant 8-row grid `G` emitted
from a 30-day walk.
