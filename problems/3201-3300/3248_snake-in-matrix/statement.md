# Snake in Matrix

## Description

There is a snake in an `n x n` matrix `grid` and can move in four possible
directions. Each cell in the grid is identified by the position:
`grid[i][j] = (i * n) + j`.

The snake starts at cell 0 and follows a sequence of commands.

You are given an integer `n` representing the size of the grid and an array
of strings `commands` where each `command[i]` is either "UP", "RIGHT",
"DOWN", and "LEFT". It's guaranteed that the snake will remain within the
grid boundaries throughout its movement.

Return the position of the final cell where the snake ends up after
executing commands.

### Example 1

```text
Input: n = 2, commands = ["RIGHT","DOWN"]
Output: 3
Explanation: The cells are numbered [[0,1],[2,3]]. Starting at cell 0,
"RIGHT" moves the snake to cell 1, then "DOWN" moves it to cell 3.
```

### Example 2

```text
Input: n = 3, commands = ["DOWN","RIGHT","UP"]
Output: 1
Explanation: The cells are numbered 0-8 row by row. Starting at cell 0,
"DOWN" moves the snake to cell 3, "RIGHT" moves it to cell 4, and "UP"
moves it back to cell 1.
```

### Constraints

- `2 <= n <= 10`
- `1 <= commands.length <= 100`
- `commands` consists only of "UP", "RIGHT", "DOWN", and "LEFT".
- The input is generated such the snake will not move outside of the
  boundaries.

## Hints

### Hint 1

Try to update the row and column of the snake after each command.
