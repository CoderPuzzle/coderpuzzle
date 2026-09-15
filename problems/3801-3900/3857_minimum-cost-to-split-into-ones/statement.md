# Minimum Cost to Split into Ones

## Description

You are given an integer n.

In one operation, you may split an integer x into two positive integers a and b such that a + b = x.

The cost of this operation is a \* b.

Return an integer denoting the minimum total cost required to split the integer n into n ones.

### Example 1

```text
Input: n = 3
Output: 3
Explanation: One optimal set of operations is to split 3 into 1 and 2 at a cost of 2, then split 2 into 1 and 1 at a cost of 1. Thus, the minimum total cost is 2 + 1 = 3.
```

### Example 2

```text
Input: n = 4
Output: 6
Explanation: One optimal set of operations is to split 4 into 2 and 2 at a cost of 4, then split each 2 into 1 and 1 at a cost of 1. Thus, the minimum total cost is 4 + 1 + 1 = 6.
```

### Constraints

- `1 <= n <= 500`

## Hints

### Hint 1

Use dynamic programming or math.

### Hint 2

It is always optimal to split the current integer x into 1 and x - 1.
