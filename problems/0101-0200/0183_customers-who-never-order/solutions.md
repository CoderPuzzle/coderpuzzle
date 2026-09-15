# Solutions — Customers Who Never Order

## Left anti-join onto Orders

The wanted set is a difference: every `Customers` row minus those that have a match in `Orders`. `Customers c LEFT JOIN Orders o ON c.id = o.customerId` keeps every customer; a matching order fills the `Orders` columns, and a customer with no order at all comes back once with null in them. `WHERE o.id IS NULL` keeps exactly those unmatched rows and `SELECT c.name AS Customers` reports their names — a left join filtered on the null side of the join is the anti-join, stated inline.

The choice of marker column matters more than it looks: `o.id` is `Orders`' primary key, null precisely on the unmatched rows, while a payload column could be null on a real match and break the filter. Because `id` is unique in `Customers`, each order matches at most one customer, so a customer with several orders produces several matched rows — all of them non-null, all filtered out — and repeats never leak into the answer. Orders whose `customerId` has no `Customers` row match nothing and vanish on their own, and when every customer orders (or the tables are empty) the filter keeps nothing, which is the correct zero-row answer.

With the join key resolved through an index or hash lookup, each of the `C` customers costs one probe into `Orders`, so the anti-join runs in `O(C + O)` time over `O` order rows, and only the result itself — at most `C` names — is materialized.

**Complexity:** `O(C + O)` time, `O(C)` space.
