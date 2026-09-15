# Shortest Path to Get Food

## Description

You are starving and you want to eat food as quickly as possible. You want to
find the shortest path to arrive at any food cell.

You are given an `m x n` character matrix, `grid`, of these different types of
cells:

- `'*'` is your location. There is exactly one `'*'` cell.
- `'#'` is a food cell. There may be multiple food cells.
- `'O'` is free space, and you can travel through these cells.
- `'X'` is an obstacle, and you cannot travel through these cells.

You can travel to any adjacent cell north, east, south, or west of your
current location if there is not an obstacle.

Return the length of the shortest path for you to reach any food cell. If
there is no path for you to reach food, return `-1`.

### Example 1

```text
Input: grid = [["X","X","X","X","X","X"],["X","*","O","O","O","X"],["X","O","O","#","O","X"],["X","X","X","X","X","X"]]
Output: 3
Explanation: It takes 3 steps to reach the food.
```

![Example 1 grid](figures/example-1.svg)

### Example 2

```text
Input: grid = [["X","X","X","X","X"],["X","*","X","O","X"],["X","O","X","#","X"],["X","X","X","X","X"]]
Output: -1
Explanation: It is not possible to reach the food.
```

![Example 2 grid](figures/example-2.svg)

### Example 3

```text
Input: grid = [["X","X","X","X","X","X","X","X"],["X","*","O","X","O","#","O","X"],["X","O","O","X","O","O","X","X"],["X","O","O","O","O","#","O","X"],["X","X","X","X","X","X","X","X"]]
Output: 6
Explanation: There can be multiple food cells. It only takes 6 steps to reach the bottom food.
```

![Example 3 grid](figures/example-3.svg)

### Example 4

```text
Input: grid = [["O","*"],["#","O"]]
Output: 2
```

### Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 200`
- `grid[row][col]` is `'*'`, `'X'`, `'O'`, or `'#'`.
- The grid contains exactly one `'*'`.

## Hints

### Hint 1

Run BFS starting from the '*' position.

### Hint 2

Keep the current number of steps as part of the state in the queue.

### Hint 3

The first time you reach a food cell, return the number of steps as the answer.

### Hint 4

If the queue empties before you reach any food, return -1.
