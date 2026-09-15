# Maximum Number of Balls in a Box

## Description

You are working in a ball factory where you have `n` balls numbered from
`lowLimit` up to `highLimit` inclusive (i.e., `n == highLimit - lowLimit + 1`),
and an infinite number of boxes numbered from 1 to infinity.

Your job at this factory is to put each ball in the box whose number is equal
to the sum of the digits of the ball's number. For example, the ball numbered
321 goes into box number 3 + 2 + 1 = 6, and the ball numbered 10 goes into box
number 1 + 0 = 1.

Given two integers `lowLimit` and `highLimit`, return the number of balls in
the box with the most balls.

### Example 1

```text
Input: lowLimit = 1, highLimit = 10
Output: 2
Explanation:
Box Number:  1 2 3 4 5 6 7 8 9 10 11 ...
Ball Count:  2 1 1 1 1 1 1 1 1 0  0  ...
Box 1 has the most number of balls with 2 balls.
```

### Example 2

```text
Input: lowLimit = 5, highLimit = 15
Output: 2
Explanation:
Box Number:  1 2 3 4 5 6 7 8 9 10 11 ...
Ball Count:  1 1 1 1 2 2 1 1 1 0  0  ...
Boxes 5 and 6 have the most number of balls with 2 balls in each.
```

### Example 3

```text
Input: lowLimit = 19, highLimit = 28
Output: 2
Explanation:
Box Number:  1 2 3 4 5 6 7 8 9 10 11 12 ...
Ball Count:  0 1 1 1 1 1 1 1 1 2  0  0  ...
Box 10 has the most number of balls with 2 balls.
```

### Constraints

- `1 <= lowLimit <= highLimit <= 10^5`

## Hints

### Hint 1

Both `lowLimit` and `highLimit` are small enough that you can iterate over
every number between them.

### Hint 2

Simulate the boxes by counting, for each box, the number of balls whose digit
sum equals that box number.
