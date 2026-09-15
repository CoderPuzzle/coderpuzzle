# Minimum Knight Moves

## Description

In an infinite chess board with coordinates from -infinity to +infinity,
you have a knight at square `[0, 0]`.

A knight has 8 possible moves it can make. Each move is two squares in a
cardinal direction, then one square in an orthogonal direction.

![diagram](figures/1197-1.svg)

Return the minimum number of steps needed to move the knight to the square
`[x, y]`. It is guaranteed the answer exists.

### Example 1

```text
Input: x = 2, y = 1
Output: 1
Explanation: [0, 0] → [2, 1]
```

### Example 2

```text
Input: x = 5, y = 5
Output: 4
Explanation: [0, 0] → [2, 1] → [4, 2] → [3, 4] → [5, 5]
```

### Constraints

- `-300 <= x, y <= 300`
- `0 <= |x| + |y| <= 300`

## Hints

### Hint 1

You can simulate the movements since the limits are low.

### Hint 2

Is there a search algorithm applicable to this problem?

### Hint 3

Since we want the minimum number of moves, we can use Breadth First Search.

Write your solution as a function returning the minimum number of steps.
