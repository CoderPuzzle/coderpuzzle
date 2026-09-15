# Solutions — Market Analysis II

## Rank each seller's sales by date, keep row 2, compare brands

The inner query numbers every sale within its seller, oldest first:
`ROW_NUMBER() OVER (PARTITION BY seller_id ORDER BY order_date)`. The
guarantee that a seller never sells twice in one day makes `order_date` a
total order inside each partition, so row 2 is unambiguously the second item
sold. Joining `Items` on `item_id` in the same pass decorates each ranked
sale with the brand of the item that changed hands.

Filtering to `rn = 2` leaves one row per seller who sold at least two items;
the brand on that row compared against the user's `favorite_brand` yields
`yes`/`no` through a CASE. Sellers with fewer than two sales never produce a
row 2, and the final **left** join back onto `Users` is what carries them
into the output anyway — a `COALESCE` maps the missing match to `no`, which
also covers the users who never sold anything at all. Buying is irrelevant
here; only the seller side of each order matters.

**Complexity:** `O(N log N)` for the per-partition date sort over `N` Orders
rows, plus `O(U)` for the user join — `O(N)` space for the ranked
intermediate.
