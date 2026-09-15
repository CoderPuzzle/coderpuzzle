# Total Distance to Type a String Using One Finger

## Description

There is a special keyboard where keys are arranged in a rectangular grid
as follows. The top row holds the letters `qwertyuiop` in columns 0 through
9, the middle row holds `asdfghjkl` in columns 0 through 8, and the bottom
row holds `zxcvbnm` in columns 0 through 6. Rows and columns are numbered
from 0, starting from the top and the left, so each key has a position
(r, c) — for example, 'a' sits at (1, 0).

You are given a string s that consists of lowercase English letters only.
Return an integer denoting the total distance to type s using only one
finger. Your finger starts on the key 'a'.

The distance between two keys at (r1, c1) and (r2, c2) is
|r1 - r2| + |c1 - c2|.

### Example 1

```text
Input: s = "hello"
Output: 17
Explanation: Your finger starts at 'a', which is at (1, 0).
Move to 'h', which is at (1, 5). The distance is |1 - 1| + |0 - 5| = 5.
Move to 'e', which is at (0, 2). The distance is |1 - 0| + |5 - 2| = 4.
Move to 'l', which is at (1, 8). The distance is |0 - 1| + |2 - 8| = 7.
Move to 'l', which is at (1, 8). The distance is |1 - 1| + |8 - 8| = 0.
Move to 'o', which is at (0, 8). The distance is |1 - 0| + |8 - 8| = 1.
Total distance is 5 + 4 + 7 + 0 + 1 = 17.
```

### Example 2

```text
Input: s = "a"
Output: 0
Explanation: Your finger starts at 'a', which is at (1, 0).
Move to 'a', which is at (1, 0). The distance is |1 - 1| + |0 - 0| = 0.
Total distance is 0.
```

### Constraints

- `1 <= s.length <= 10⁴`
- `s` consists of lowercase English letters only.

## Hints

### Hint 1

Map each character to its (row, col) position on the keyboard grid.

### Hint 2

Start from the position of 'a' and process the string from left to right.

### Hint 3

For each move, add the Manhattan distance abs(r1 - r2) + abs(c1 - c2)
between consecutive keys.

### Hint 4

Accumulate the total distance and return the sum.
