# Solutions — Sellers With No Sales

## Anti-join via a NOT IN subquery on the 2020 seller_ids

The set of sellers to report is every seller whose `seller_id` never
appears among the `Orders` rows dated in 2020 — including sellers with
orders confined to other years and sellers with no orders at all. A
subquery `SELECT seller_id FROM Orders WHERE strftime('%Y', sale_date) =
'2020'` collects exactly the sellers disqualified by a 2020 sale;
`WHERE seller_id NOT IN (...)` against `Seller` then keeps every seller
outside that set, regardless of how many other-year orders they carry or
whether they carry none at all.

`ORDER BY seller_name` finishes the query with the required ascending
sort on `seller_name`, matching the result format.

**Complexity:** proportional to the size of `Orders` plus `Seller`,
dominated by the subquery's scan of `Orders` and the final sort of the
qualifying sellers.
