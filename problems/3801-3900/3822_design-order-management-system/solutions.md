# Solutions — Design Order Management System

Two maps kept in lockstep answer every method: an index from orderId to
its attributes, and buckets keyed by (orderType, price) holding the ids
currently sitting at each key.

## Paired maps: orderId index plus (type, price) buckets

`orders` maps each orderId to its (type, price) pair, `buckets` maps each
(type, price) key to the set of active ids at that key. `addOrder` writes
both; `getOrdersAtPrice` is then a single bucket lookup, returning the
bucket's ids sorted — the statement frees the order, so the sort is a
determinism courtesy, not a requirement. The two write paths are where the
maps must stay in step: `modifyOrder` reads the old pair from the id index,
removes the id from its old bucket, and re-inserts it at the new price
(a same-price modify degenerates into remove-and-reinsert under the same
key, which changes nothing observable), while `cancelOrder` removes the id
from both. Since `modifyOrder` only takes a price, an order's type never
changes, so no id can ever leak across the buy/sell split. Implementations
that want a single hashable key pack the type into one bit above 30 price
bits (`price <= 10^9 < 2^30`), which stays exact in every language
including JS doubles.

Every mutation is a constant number of hash lookups and updates — `O(1)`
average per `addOrder`/`modifyOrder`/`cancelOrder`. A query copies its
bucket and sorts it: `O(k log k)` for the `k` ids at the queried
(orderType, price), `k <= 2000`. The two maps together hold one entry per
active order, so the footprint is `O(n)` space for `n` live orders.

**Complexity:** `O(1)` average time per mutation, `O(k log k)` per query
(`k` matching ids), `O(n)` space.
