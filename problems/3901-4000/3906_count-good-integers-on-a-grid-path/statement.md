# Count Good Integers on a Grid Path

## Description

You are given two integers `l` and `r`, and a string `directions` consisting
of exactly three `'D'` characters and three `'R'` characters.

For each integer `x` in the range `[l, r]` (inclusive), perform the following
steps:

- If `x` has fewer than 16 digits, pad it on the left with leading zeros to
  obtain a 16-digit string.
- Place the 16 digits into a `4 × 4` grid in row-major order (the first 4
  digits form the first row from left to right, the next 4 digits form the
  second row, and so on).
- Starting at the top-left cell (`row = 0`, `column = 0`), apply the 6
  characters of `directions` in order:

    - `'D'` increments the row by 1.
    - `'R'` increments the column by 1.

- Record the sequence of digits visited along the path (including the
  starting cell), producing a sequence of length 7.

The integer `x` is considered good if the recorded sequence is
non-decreasing.

Return an integer representing the number of good integers in the range
`[l, r]`.

### Example 1

```text
Input: l = 8, r = 10, directions = "DDDRRR"
Output: 2
Explanation:
    The grid for x = 8:
    Path: (0,0) → (1,0) → (2,0) → (3,0) → (3,1) → (3,2) → (3,3)
    The sequence of digits visited is [0, 0, 0, 0, 0, 0, 8].
    As the sequence of digits visited is non-decreasing, 8 is a good integer.

    The grid for x = 9:
    The sequence of digits visited is [0, 0, 0, 0, 0, 0, 9].
    As the sequence of digits visited is non-decreasing, 9 is a good integer.

    The grid for x = 10:
    The sequence of digits visited is [0, 0, 0, 0, 0, 1, 0].
    As the sequence of digits visited is not non-decreasing, 10 is not a good
    integer.
    Hence, only 8 and 9 are good, giving a total of 2 good integers in the
    range.
```

### Example 2

```text
Input: l = 123456789, r = 123456790, directions = "DDRRDR"
Output: 1
Explanation:
    The grid for x = 123456789:
    Path: (0,0) → (1,0) → (2,0) → (2,1) → (2,2) → (3,2) → (3,3)
    The sequence of digits visited is [0, 0, 2, 3, 4, 8, 9].
    As the sequence of digits visited is non-decreasing, 123456789 is a good
    integer.

    The grid for x = 123456790:
    The sequence of digits visited is [0, 0, 2, 3, 4, 9, 0].
    As the sequence of digits visited is not non-decreasing, 123456790 is not
    a good integer.
    Hence, only 123456789 is good, giving a total of 1 good integer in the
    range.
```

### Example 3

```text
Input: l = 1288561398769758, r = 1288561398769758, directions = "RRRDDD"
Output: 0
Explanation:
    The grid for x = 1288561398769758:
    Path: (0,0) → (0,1) → (0,2) → (0,3) → (1,3) → (2,3) → (3,3)
    The sequence of digits visited is [1, 2, 8, 8, 3, 6, 8].
    As the sequence of digits visited is not non-decreasing,
    1288561398769758 is not a good integer.
    No numbers are good, giving a total of 0 good integers in the range.
```

### Constraints

- `1 <= l <= r <= 9 × 10¹⁵`
- `directions.length == 6`
- `directions` consists of exactly three `'D'` characters and three `'R'`
  characters.

## Hints

### Hint 1

Simulate the path to get the 7 increasing indices; since moves are only
down/right, the visited positions are in left-to-right digit order, so you
only need to check those 7 digits are non-decreasing.

### Hint 2

Use digit dynamic programming with states `pos` (`0..15`), `tight` (`0/1`),
`cnt` (how many path digits placed `0..7`), and `prev` (previous path digit
`0..9`); when `pos` is a path index, require the chosen digit `>= prev` and
advance `cnt`.

### Hint 3

Compute `f(N)` = count of good numbers `N` and return `f(r) - f(l-1)`.
