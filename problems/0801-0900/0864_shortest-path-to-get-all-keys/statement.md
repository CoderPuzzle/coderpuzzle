# Shortest Path to Get All Keys

## Description

You are given an `m x n` grid `grid` where:

- `'.'` is an empty cell.
- `'#'` is a wall.
- `'@'` is the starting point.
- Lowercase letters represent keys.
- Uppercase letters represent locks.

You start at the starting point and one move consists of walking one space in one of the four cardinal directions. You cannot walk outside the grid, or walk into a wall.

If you walk over a key, you can pick it up and you cannot walk over a lock unless you have its corresponding key.

For some `1 <= k <= 6`, there is exactly one lowercase and one uppercase letter of the first `k` letters of the English alphabet in the grid. This means that there is exactly one key for each lock, and one lock for each key; and also that the letters used to represent the keys and locks were chosen in the same order as the English alphabet.

Return the lowest number of moves to acquire all keys. If it is impossible, return `-1`.

### Example 1

```text
Input: grid = ["@.a..","###.#","b.A.B"]
Output: 8
Explanation: Note that the goal is to obtain all the keys not to open all the locks.
```

![The grid with the 8-move route from @ to key a and around the wall to key b highlighted.](figures/example-1.svg)

### Example 2

```text
Input: grid = ["@..aA","..B#.","....b"]
Output: 6
```

![The grid with the 6-move route from @ through key a and lock A down to key b highlighted.](figures/example-2.svg)

### Example 3

```text
Input: grid = ["@Aa"]
Output: -1
```

![A single row @ A a with a blocked barrier on lock A, since key a is unreachable.](figures/example-3.svg)

### Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 30`
- `grid[i][j]` is either an English letter, `'.'`, `'#'`, or `'@'`.
- There is exactly one `'@'` in the grid.
- The number of keys in the grid is in the range `[1, 6]`.
- Each key in the grid is unique.
- Each key in the grid has a matching lock.

## Hints

### Hint 1

There are at most 6 keys, so a bitmask can represent the set of keys collected so far.

### Hint 2

Run a breadth-first search over (row, column, keys-mask) states, only walking onto a lock when its key is already held.

### Hint 3

The first state whose mask contains every key gives the answer; if the search ends without reaching it, return -1.
