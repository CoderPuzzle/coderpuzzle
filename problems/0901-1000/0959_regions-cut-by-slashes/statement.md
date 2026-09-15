# Regions Cut By Slashes

## Description

An `n x n` grid is built from `1 x 1` squares, and each square carries
exactly one of three markings: a slash `/`, a backslash `\`, or a blank
space ` `. A slash or a backslash is a wall drawn inside its square — the
slash joins the square's bottom-left corner to its top-right corner, the
backslash joins its top-left corner to its bottom-right — while a blank
square holds no wall. Taken together, these walls partition the big
square into contiguous regions: two points of empty space belong to the
same region exactly when some path through empty space connects them
without touching a wall.

You are given the grid `grid` as an array of strings, one string per
row, where the `j`-th character of `grid[i]` is the marking of the square
in row `i`, column `j`. Return the number of regions.

Note that backslash characters are escaped, so a square holding a `\` is
written as `\\` inside `grid`.

### Example 1

![diagram](figures/959-1.svg)

```text
Input: grid = [" /", "/ "]
Output: 2
```

### Example 2

![diagram](figures/959-2.svg)

```text
Input: grid = [" /", "  "]
Output: 1
```

### Example 3

![diagram](figures/959-3.svg)

```text
Input: grid = ["/\\", "\\/"]
Output: 5
Explanation: Unescape first: "/\\" is the row /\ and "\\/" is the row \/.
The four walls chain into a diamond whose corners touch the middle of the
square's four sides, so the square's four corners and the diamond's
interior are five separate regions.
```

### Constraints

- `n == grid.length == grid[i].length`
- `1 <= n <= 30`
- `grid[i][j]` is either `'/'`, `'\'`, or `' '`.
