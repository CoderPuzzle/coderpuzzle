# The Maze II

## Description

There is a ball in a maze with empty spaces (represented as `0`) and walls
(represented as `1`). The ball can go through the empty spaces by rolling up,
down, left or right, but it won't stop rolling until hitting a wall. When the
ball stops, it could choose the next direction.

Given the `m x n` maze, the ball's start position and the destination, where
`start = [startrow, startcol]` and `destination = [destinationrow, destinationcol]`,
return the shortest distance for the ball to stop at the destination. If the
ball cannot stop at the destination, return `-1`.

The distance is the number of empty spaces traveled by the ball from the
start position (excluded) to the destination (included).

You may assume that the borders of the maze are all walls (see examples).

### Example 1

```text
Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [4,4]
Output: 12
Explanation: One possible way is: left -> down -> left -> down -> right -> down -> right.
The length of the path is 1 + 1 + 3 + 1 + 2 + 2 + 2 = 12.
```

### Example 2

```text
Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [3,2]
Output: -1
Explanation: There is no way for the ball to stop at the destination. Notice that you can pass through the destination but you cannot stop there.
```

### Example 3

```text
Input: maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], start = [4,3], destination = [0,1]
Output: -1
```

### Constraints

- `m == maze.length`
- `n == maze[i].length`
- `1 <= m, n <= 100`
- `maze[i][j]` is `0` or `1`.
- `start.length == 2`
- `destination.length == 2`
- `0 <= startrow, destinationrow < m`
- `0 <= startcol, destinationcol < n`
- Both the ball and the destination exist in an empty space, and they will
  not be in the same position initially.
- The maze contains at least 2 empty spaces.

## Hints

### Hint 1

From each stopping cell, simulate rolling in each of the four directions until the ball hits a wall or the border; the new stopping cell is a neighbor reached at cost equal to the number of cells rolled.

### Hint 2

Since different stop-to-stop edges have different costs, use Dijkstra's algorithm over stopping cells instead of plain BFS.

### Hint 3

Track the best known distance per stopping cell and skip popped states that are stale; return -1 if the destination is never reached as a stopping cell.
