# Number of Ways to Build Sturdy Brick Wall

## Description

You are given integers `height` and `width` which specify the dimensions
of a brick wall you are building. You are also given a 0-indexed array of
unique integers `bricks`, where the ith brick has a height of 1 and a
width of `bricks[i]`. You have an infinite supply of each type of brick
and bricks may not be rotated.

Each row in the wall must be exactly `width` units long. For the wall to
be sturdy, adjacent rows in the wall should not join bricks at the same
location, except at the ends of the wall.

Return the number of ways to build a sturdy wall. Since the answer may be
very large, return it modulo `10^9 + 7`.

### Example 1

![diagram](figures/2184-1.svg)

```text
Input: height = 2, width = 3, bricks = [1,2]
Output: 2
Explanation:
There are two ways to build a sturdy brick wall.
One way stacks a [1,2] row on top of a [2,1] row; the other stacks
[2,1] over [1,2].
Note that stacking [1,2] directly over [1,2] is not sturdy because
adjacent rows join bricks 1 unit from the left.
```

### Example 2

```text
Input: height = 1, width = 1, bricks = [5]
Output: 0
Explanation:
There are no ways to build a sturdy wall because the only type of brick
we have is longer than the width of the wall.
```

### Constraints

- `1 <= height <= 100`
- `1 <= width <= 10`
- `1 <= bricks.length <= 10`
- `1 <= bricks[i] <= 10`
- All the values of `bricks` are unique.

## Hints

### Hint 1

A row of bricks can be represented uniquely by the points where two
bricks are joined together.

### Hint 2

For a given row of bricks, how many configurations of bricks could you
have put below this row such that the wall is sturdy?

### Hint 3

Use dynamic programming to store the number of possible sturdy walls with
a given height and configuration of bricks on the top row.
