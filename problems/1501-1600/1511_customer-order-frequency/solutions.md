# Solutions — Customer Order Frequency

## Join, group by customer, and gate on two conditional sums

Join `Orders` to `Product` to price each line, then to `Customers` to
carry the display name, and group the joined rows by customer. Two
`SUM(CASE WHEN ... THEN quantity * price ELSE 0 END)` expressions
inside the same aggregation isolate June's and July's spend without a
second pass over the data: each `CASE` zeroes out rows outside its
month before the sum adds them up, so both totals fall out of one
`GROUP BY`.

The `HAVING` clause then keeps only customers whose June sum and July
sum both clear $100. Because `order_date` is stored in ISO
`YYYY-MM-DD` form, comparing it against the literal month bounds with
`BETWEEN` sorts correctly as plain text, so no date-parsing functions
are needed.

**Complexity:** `O(n)` time and `O(n)` space, where `n` is the number
of orders — every row is visited once by the joins and once by the
aggregation.
