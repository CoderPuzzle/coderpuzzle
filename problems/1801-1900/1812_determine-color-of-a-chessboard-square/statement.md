# Determine Color of a Chessboard Square

## Description

You are given `coordinates`, a string that represents the coordinates of
a square of the chessboard. Below is a chessboard for your reference.

![diagram](figures/1812-1.svg)

Return `true` if the square is white, and `false` if the square is
black.

The coordinate will always represent a valid chessboard square. The
coordinate will always have the letter first, and the number second.

### Example 1

```text
Input: coordinates = "a1"
Output: false
Explanation: From the chessboard above, the square with coordinates
"a1" is black, so return false.
```

### Example 2

```text
Input: coordinates = "h3"
Output: true
Explanation: From the chessboard above, the square with coordinates
"h3" is white, so return true.
```

### Example 3

```text
Input: coordinates = "c7"
Output: false
```

### Constraints

- `coordinates.length == 2`
- `'a' <= coordinates[0] <= 'h'`
- `'1' <= coordinates[1] <= '8'`

## Hints

### Hint 1

Convert the coordinates to (x, y) - that is, "a1" is (1, 1), "d7" is
(4, 7).

### Hint 2

Try add the numbers together and look for a pattern.
