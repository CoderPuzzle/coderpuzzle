# Solutions — Calculate the Influence of Each Salesperson

## Left-join the chain, sum with a zero fallback

The money path runs salesperson -> customer -> sale, and the report needs
every salesperson row even when that path is empty — so the joins must be
LEFT joins. Starting from `Salesperson`, joining `Customer` on
`salesperson_id` keeps salespeople without customers (their customer
columns go NULL), and the second LEFT join to `Sales` on `customer_id`
keeps customers who never bought anything the same way. A chain of inner
joins would silently delete exactly the rows the statement insists on
reporting.

With each salesperson's rows gathered, `GROUP BY` collapses them to one
line per salesperson and `SUM(price)` totals their customers' purchases.
NULL handling is the last detail: for Jerry-style rows every joined
`price` is NULL, and plain `SUM` returns NULL rather than 0, so
`COALESCE(SUM(price), 0)` substitutes the required zero.

Joining and grouping sweep the tables once against their keys; sorting is
unnecessary because the comparison accepts any row order.

**Complexity:** `O(S + C + L)` rows processed (salespeople, customers,
sale lines), `O(C)` space for the join hash of customers.
