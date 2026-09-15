# Design Order Management System

## Description

You are asked to design a simple order management system for a trading
platform.

Each order is associated with an orderId, an orderType ("buy" or "sell"),
and a price.

An order is considered active unless it is canceled.

Implement the `OrderManagementSystem` class:

- `OrderManagementSystem()` Initializes the order management system.
- `void addOrder(int orderId, string orderType, int price)` Adds a new active
  order with the given attributes. It is guaranteed that orderId is unique.
- `void modifyOrder(int orderId, int newPrice)` Modifies the price of an
  existing order. It is guaranteed that the order exists and is active.
- `void cancelOrder(int orderId)` Cancels an existing order. It is guaranteed
  that the order exists and is active.
- `vector<int> getOrdersAtPrice(string orderType, int price)` Returns the
  orderIds of all active orders that match the given orderType and price. If
  no such orders exist, return an empty list.

Note: The order of returned orderIds does not matter.

### Example 1

```text
Input:
["OrderManagementSystem", "addOrder", "addOrder", "addOrder", "getOrdersAtPrice", "modifyOrder", "modifyOrder", "getOrdersAtPrice", "cancelOrder", "cancelOrder", "getOrdersAtPrice"]
[[], [1, "buy", 1], [2, "buy", 1], [3, "sell", 2], ["buy", 1], [1, 3], [2, 1], ["buy", 1], [3], [2], ["buy", 1]]

Output:
[null, null, null, null, [2, 1], null, null, [2], null, null, []]

Explanation
OrderManagementSystem orderManagementSystem = new OrderManagementSystem();
orderManagementSystem.addOrder(1, "buy", 1); // A buy order with ID 1 is added at price 1.
orderManagementSystem.addOrder(2, "buy", 1); // A buy order with ID 2 is added at price 1.
orderManagementSystem.addOrder(3, "sell", 2); // A sell order with ID 3 is added at price 2.
orderManagementSystem.getOrdersAtPrice("buy", 1); // Both buy orders (IDs 1 and 2) are active at price 1, so the result is [2, 1].
orderManagementSystem.modifyOrder(1, 3); // Order 1 is updated: its price becomes 3.
orderManagementSystem.modifyOrder(2, 1); // Order 2 is updated, but its price remains 1.
orderManagementSystem.getOrdersAtPrice("buy", 1); // Only order 2 is still an active buy order at price 1, so the result is [2].
orderManagementSystem.cancelOrder(3); // The sell order with ID 3 is canceled and removed from active orders.
orderManagementSystem.cancelOrder(2); // The buy order with ID 2 is canceled and removed from active orders.
orderManagementSystem.getOrdersAtPrice("buy", 1); // There are no active buy orders left at price 1, so the result is [].
```

### Constraints

- `1 <= orderId <= 2000`
- orderId is unique across all orders.
- orderType is either "buy" or "sell".
- `1 <= price <= 10⁹`
- The total number of calls to `addOrder`, `modifyOrder`, `cancelOrder`, and
  `getOrdersAtPrice` does not exceed 2000.
- For `modifyOrder` and `cancelOrder`, the specified orderId is guaranteed
  to exist and be active.

## Hints

### Hint 1

Keep track of orders by their orderId so you can quickly modify or cancel
them.

### Hint 2

Group active orders by (orderType, price) to efficiently answer queries.

### Hint 3

When an order is modified or canceled, make sure all related data structures
stay in sync.
