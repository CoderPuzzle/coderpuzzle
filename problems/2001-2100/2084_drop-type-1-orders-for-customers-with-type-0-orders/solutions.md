# Solutions — Drop Type 1 Orders for Customers With Type 0 Orders

## Keep type 0 orders or customers without one

Every type 0 order belongs in the result. For any other row, a correlated `NOT EXISTS` checks whether the same customer has a type 0 order; only when no such row exists is the type 1 order retained. This applies the rule per customer while preserving all three columns and every qualifying order.

Without an index on `customer_id`, the correlated subquery may scan `Orders` for each outer row. It uses only constant auxiliary state and can stop as soon as it finds a matching type 0 order.

**Complexity:** `O(N²)` time and `O(1)` extra space for `N` orders.
