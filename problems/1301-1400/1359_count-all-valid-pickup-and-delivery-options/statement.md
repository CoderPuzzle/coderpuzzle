# Count All Valid Pickup and Delivery Options

## Description

Given `n` orders, each order consists of a pickup and a delivery service.

Count all valid pickup/delivery possible sequences such that `delivery(i)` is always after of `pickup(i)`.

Since the answer may be too large, return it modulo `10⁹ + 7`.

### Example 1

```text
Input: n = 1
Output: 1
Explanation: Unique order (P1, D1), Delivery 1 always is after of Pickup 1.
```

### Example 2

```text
Input: n = 2
Output: 6
Explanation: All possible orders:
(P1,P2,D1,D2), (P1,P2,D2,D1), (P1,D1,P2,D2), (P2,P1,D1,D2), (P2,P1,D2,D1) and (P2,D2,P1,D1).
This is an invalid order (P1,D2,P2,D1) because Pickup 2 is after of Delivery 2.
```

### Example 3

```text
Input: n = 3
Output: 90
```

### Constraints

- `1 <= n <= 500`

## Hints

### Hint 1

Use permutation and combination theory to add one (P, D) pair at a time until n pairs are placed.

### Hint 2

With i pairs already placed there are 2i + 1 slots; count the ways to insert the next pickup and delivery so that delivery stays after its pickup.
