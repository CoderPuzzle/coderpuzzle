# Solutions — Product's Worth Over Invoices

One aggregation joined back onto the product list answers the question:
each product's `rest`, `paid`, `canceled`, and `refunded` figures are the
`SUM`s over that product's invoice rows, zero-filled when it has none.

## LEFT JOIN Product onto per-product invoice sums

The inner query collapses `Invoice` into one row per `product_id` holding
the four `SUM`s — a product with many invoices folds into that single
row, and a product with no invoices is simply absent from the
aggregation. `LEFT JOIN` then walks `Product` down that result: matched
products pick up their totals, while a product with no invoice rows at
all keeps its place in the output carrying `NULL`s from the unmatched
side, which `COALESCE(..., 0)` turns into the required zeros. That
zero-fill is the "for all products" guarantee — the example leaves it
untested (both of its products carry invoices), and a plain inner join
would silently drop every invoice-less product instead.

`ORDER BY p.name` finishes the query with the required ascending sort on
the product name. The judge compares result multisets, so that ordering
is a statement requirement rather than a comparison one — row order
cannot fail a case.

**Complexity:** `O(p + i log i)` time (aggregation + ordering), `O(p)` space.
