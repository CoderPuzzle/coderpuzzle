# Tallest Billboard

## Description

You are installing a billboard and want it to stand as tall as possible. The
billboard is held up by two steel supports, one on each side, and the two
supports must be built to exactly the same height.

You are given a collection of rods that can be welded together. For example,
with rods of lengths 1, 2, and 3 you can weld all three into a single support
of length 6. Each rod may be welded into the left support, welded into the
right support, or left unused — a rod cannot be cut apart and cannot serve
both supports at once.

Return the largest possible height of your billboard installation. If the two
supports cannot be made equally tall, return 0.

### Example 1

```text
Input: rods = [1,2,3,6]
Output: 6
Explanation: The rods 1, 2, and 3 weld into one support of height 6, and the
rod 6 alone forms the other support, so both stands reach height 6.
```

### Example 2

```text
Input: rods = [1,2,3,4,5,6]
Output: 10
Explanation: The rods 2, 3, and 5 weld into one support of height 10, and the
rods 4 and 6 weld into the other.
```

### Example 3

```text
Input: rods = [1,2]
Output: 0
Explanation: No two disjoint rod sets have the same total length, so the
billboard cannot be supported.
```

### Constraints

- `1 <= rods.length <= 20`
- `1 <= rods[i] <= 1000`
- `sum(rods[i]) <= 5000`
