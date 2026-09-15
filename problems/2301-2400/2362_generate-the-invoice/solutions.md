# Solutions — Generate the Invoice

## Join the lines to their unit prices, rank invoices, keep the winner's rows

The answer needs two grains at once — the invoice total that decides the
winner and the line detail the output reports — so `Purchases` is joined
to `Products` on `product_id`, putting each line's unit price next to it.
`GROUP BY invoice_id` then collapses the joined rows into one row per
invoice whose aggregate `SUM(price * quantity)` is exactly the invoice
price from the explanation. Ranking those totals with a window function
keeps every invoice visible while they are compared:
`RANK() OVER (ORDER BY total DESC, invoice_id ASC)` hands the shared top
rank to all highest-priced invoices in ascending id order, so the winner
— highest price, smallest id on ties — is precisely whichever row holds
rank 1. Filtering to that rank inside an outer query (window functions
cannot sit in `WHERE`) yields one surviving invoice id; joining back to
the priced lines selects only its rows.

Because `comparison` is a multiset over three columns, any row order is
accepted; nothing needs an `ORDER BY`. Every purchase references a
product in `Products`, so the inner join preserves all lines, while
never-purchased products contribute no join row and stay absent. The
dataset always contains at least one purchase, so some invoice exists
and the answer is never empty.

Joining and grouping sweep the n purchase rows once against the p priced
products; ranking sorts the k <= n invoice totals, and emitting the
winner's m rows costs no more than another pass over the join.

**Complexity:** `O(n log n)` time, `O(n + p)` space.
