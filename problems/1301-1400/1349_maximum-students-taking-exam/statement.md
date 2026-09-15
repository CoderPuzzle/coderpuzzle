# Maximum Students Taking Exam

## Description

Given a `m * n` matrix `seats` that represents seat distributions in a
classroom. If a seat is broken, it is denoted by `'#'` character otherwise it
is denoted by a `'.'` character.

Students can see the answers of those sitting next to the left, right, upper
left and upper right, but he cannot see the answers of the student sitting
directly in front or behind him. Return the maximum number of students that can
take the exam together without any cheating being possible.

Students must be placed in seats in good condition.

### Example 1

```text
Input: seats = [["#",".","#","#",".","#"],
                [".","#","#","#","#","."],
                ["#",".","#","#",".","#"]]
Output: 4
Explanation: Teacher can place 4 students in available seats so they don't cheat on the exam.
```

![The 3 x 6 classroom with broken seats shaded; four students sit in the free seats of rows 0 and 2 with no cheating sightlines.](figures/example-1.svg)

### Example 2

```text
Input: seats = [[".","#"],
                ["#","#"],
                ["#","."],
                ["#","#"],
                [".","#"]]
Output: 3
Explanation: Place all students in available seats.
```

### Example 3

```text
Input: seats = [["#",".",".",".","#"],
                [".","#",".","#","."],
                [".",".","#",".","."],
                [".","#",".","#","."],
                ["#",".",".",".","#"]]
Output: 10
Explanation: Place students in available seats in column 1, 3 and 5.
```

### Constraints

- `seats` contains only characters `'.'` and `'#'`.
- `m == seats.length`
- `n == seats[i].length`
- `1 <= m <= 8`
- `1 <= n <= 8`

## Hints

### Hint 1

Students in row i only can see exams in row i+1.

### Hint 2

Use Dynamic programming to compute the result given a (current row, bitmask people seated in previous row).
