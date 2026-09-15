# Solutions — Top Travellers

## Left join, group by user, and sort

The answer needs one row per user regardless of whether the user has any
rides, so the query starts from `Users` and `LEFT JOIN`s `Rides` on the
user id. That keeps every user row; a user without rides simply has no
matching ride rows, and the joined columns are null for that row.

Grouping by the user (its id, and name alongside) collapses each user's
rows into one, and `SUM(r.distance)` adds up that user's ride distances.
For a user with no rides the sum is null, which the statement asks to
report as 0, so `COALESCE(SUM(r.distance), 0)` produces the correct
`travelled_distance` for every user, riders and non-riders alike.

The requested ordering is a two-key sort: `ORDER BY travelled_distance
DESC, name ASC` puts the farthest travelers first and breaks equal
distances by name in ascending (alphabetical) order — exactly the order
the example shows.

**Complexity:** `O(U + R)` time to scan and join the two tables, plus the
cost of sorting the `U` result rows; `O(U)` space for the grouping.
