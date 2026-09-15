# Minimum Moves to Convert String

## Description

You are given a string `s` consisting of `n` characters, each of which is
either `'X'` or `'O'`.

A move consists of selecting three consecutive characters of `s` and
converting them to `'O'`. If a move is applied to a character that is already
`'O'`, it stays the same.

Return the minimum number of moves required to convert every character of `s`
to `'O'`.

### Example 1

```text
Input: s = "XXX"
Output: 1
Explanation: XXX -> OOO. Select all three characters and convert them in one move.
```

### Example 2

```text
Input: s = "XXOX"
Output: 2
Explanation: XXOX -> OOOX -> OOOO. Select the first three characters in the
first move, then select the last three characters in the second move.
```

### Example 3

```text
Input: s = "OOOO"
Output: 0
Explanation: There are no 'X's to convert.
```

### Constraints

- `3 <= s.length <= 1000`
- `s[i]` is either `'X'` or `'O'`.

## Hints

### Hint 1

Find the smallest substring you need to consider at a time.

### Hint 2

Try delaying a move as long as possible.
