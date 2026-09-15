# Solutions — Sales Person

## The complement of the RED orders

The answer is a complement, and the excluded set travels one path — an
`Orders` row. The subquery `SELECT sales_id FROM Orders JOIN Company ON
Orders.com_id = Company.com_id WHERE Company.name = 'RED'` follows each
order to its company and collects the ids of the salespersons whose
orders land on the company named RED; `WHERE sales_id NOT IN (...)` then
walks `SalesPerson` and keeps every row outside that set, and the
projection is the answer's one column, `name`.

Each piece earns its place. The join is inner on purpose: an order whose
`com_id` has no `Company` row names an unknown company — not RED — and
so drops out of the exclusion set on its own. `NOT IN` needs no special
case for the order-less: a salesperson with no orders appears nowhere in
the set, and a single order at RED is already enough to be in it —
membership, not count, decides. The name comparison is exact and
case-sensitive: a company `'red'` or `'REDS'` is a different company
from `'RED'`, and only the exact name excludes. Because `sales_id` is a
foreign key the exclusion set never holds null — the one hazard of `NOT
IN` under SQL's three-valued logic, where a null member would turn every
`NOT IN` test unknown — though the shape `NOT EXISTS (SELECT 1 FROM
Orders o JOIN Company c ON o.com_id = c.com_id WHERE o.sales_id =
SalesPerson.sales_id AND c.name = 'RED')` states the same complement
without leaning on that guarantee. Selecting from `SalesPerson`, never
from `Orders`, guarantees one row per salesperson however many orders
they placed, so two salespersons who share a name stay two rows and a
half-excluded pair leaves exactly one.

One pass over the `O` orders — each reaching its company through an
index or hash lookup — builds the exclusion set, and one scan of the `S`
salespersons tests each id against it; only the set and the output are
retained.

**Complexity:** `O(S + O)` time, `O(S + O)` space.
