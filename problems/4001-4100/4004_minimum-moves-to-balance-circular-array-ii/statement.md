# Minimum Moves to Balance Circular Array II

## Description

You are given a circular array balance of length n, where balance[i] is the
net balance of person i.

In one move, a person can transfer exactly 1 unit of balance to either their
left or right neighbor.

Return the minimum number of moves required so that every person has a
non-negative balance. If it is impossible, return -1.

### Example 1

```text
Input: balance = [-1,2,-1]
Output: 2
Explanation:
One optimal sequence of moves is:
Move 1 unit from i = 1 to i = 0, resulting in balance = [0, 1, -1]
Move 1 unit from i = 1 to i = 2, resulting in balance = [0, 0, 0]
Thus, the minimum number of moves required is 2.
```

### Example 2

```text
Input: balance = [4,-1,-2]
Output: 3
Explanation:
One optimal sequence of moves is:
Move 1 unit from i = 0 to i = 1, resulting in balance = [3, 0, -2]
Move 1 unit from i = 0 to i = 2, resulting in balance = [2, 0, -1]
Move 1 unit from i = 0 to i = 2, resulting in balance = [1, 0, 0]
Thus, the minimum number of moves required is 3.
```

### Example 3

```text
Input: balance = [-3,-3,5]
Output: -1
Explanation:
It is impossible to make all balances non-negative for balance = [-3, -3, 5], so the answer is -1.
```

### Constraints

- `1 <= n == balance.length <= 1000`
- `-10⁵ <= balance[i] <= 10⁵`

## Hints

### Hint 1

If the sum of all balances is negative, it is impossible to make every balance non-negative.

### Hint 2

View every positive balance as a supply and every negative balance as a demand. Moving one unit across one edge of the circular array costs one move.

### Hint 3

Build a minimum-cost flow network: connect a source to surplus positions, deficit positions to a sink, and every pair of neighboring positions in both directions with cost 1.

### Hint 4

Send enough flow to cover all deficits. The minimum flow cost is the required minimum number of moves.
