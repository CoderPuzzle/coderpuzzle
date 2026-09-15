# Solutions — Number of Trusted Contacts of a Customer

## Approach: Per-customer contact aggregates joined to invoices

Each invoice needs two per-customer numbers, so compute them once in
subqueries and join. `contacts_cnt` comes from grouping `Contacts` by
`user_id` with `COUNT(*)`; `trusted_contacts_cnt` groups only the rows whose
`contact_email` matches some row of `Customers` (an `EXISTS` half-join keeps
the count at one row per contact even if an email appeared twice among
customers). Both aggregates are computed over all customers, then
`LEFT JOIN`ed to the invoice's user so customers without any contacts get
`0` via `COALESCE` rather than dropping the invoice.

Finally join `Customers` for the name, and order the whole result by
`invoice_id`.

**Complexity:** `O(C + I log I)` for `C` contacts and `I` invoices (the
group-bys plus ordering the output), `O(I)` output.
