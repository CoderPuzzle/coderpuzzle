# Snakes and Ladders

## Description

You are given an `n x n` integer matrix `board` whose cells are labeled from
`1` to `n²` in boustrophedon style, starting at the bottom-left cell
`board[n - 1][0]` and alternating direction each row: the bottom row is
numbered left to right, the row above it right to left, and so on up to the
top row.

You start on square `1` of the board. In each move, starting from square
`curr`, you do the following:

- Choose a destination square `next` with a label in the range
  `[curr + 1, min(curr + 6, n²)]`. This choice simulates the result of a
  standard 6-sided die roll: there are always at most 6 destinations,
  regardless of the size of the board.
- If `next` has a snake or ladder, you must move to the destination of that
  snake or ladder. Otherwise, you move to `next`.
- The game ends when you reach the square `n²`.

A board square on row `r` and column `c` has a snake or ladder if
`board[r][c] != -1`. The destination of that snake or ladder is `board[r][c]`.
The squares labeled `1` and `n²` are not the starting points of any snake or
ladder.

You only take a snake or ladder at most once per dice roll. If the destination
of a snake or ladder is the start of another snake or ladder, you do not follow
the subsequent snake or ladder: on the board `[[-1,4],[-1,3]]`, a first move
whose destination is square `2` follows the ladder to square `3` but does not
continue on to square `4`.

Return the least number of dice rolls required to reach the square `n²`. If it
is not possible to reach the square, return `-1`.

### Example 1

![diagram](figures/909-1.svg)

```text
Input: board =
[[-1,-1,-1,-1,-1,-1]
,[-1,-1,-1,-1,-1,-1]
,[-1,-1,-1,-1,-1,-1]
,[-1,35,-1,-1,13,-1]
,[-1,-1,-1,-1,-1,-1]
,[-1,15,-1,-1,-1,-1]]
Output: 4
Explanation: You start at square 1 (row 5, column 0). You decide to move to
square 2 and must take the ladder to square 15. You then decide to move to
square 17 and must take the snake to square 13. You then decide to move to
square 14 and must take the ladder to square 35. You then decide to move to
square 36, ending the game. This is the lowest possible number of moves, so
the answer is 4.
```

### Example 2

```text
Input: board = [[-1,-1],[-1,3]]
Output: 1
Explanation: The destination range of the first move is [2, min(1 + 6, 4)],
so you may choose square 4 directly and finish the game in one roll.
```

### Constraints

- `n == board.length == board[i].length`
- `2 <= n <= 20`
- `board[i][j]` is either `-1` or in the range `[1, n²]`.
- The squares labeled `1` and `n²` are not the starting points of any snake or
  ladder.
