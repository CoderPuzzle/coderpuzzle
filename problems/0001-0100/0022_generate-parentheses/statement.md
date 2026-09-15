# Generate Parentheses

## Description

Given `n` pairs of parentheses, write a function to generate all
combinations of well-formed parentheses.

Return the combinations in lexicographic order (with `'(' < ')'`).

### Example 1

```text
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
```

### Example 2

```text
Input: n = 1
Output: ["()"]
```

### Constraints

- `1 <= n <= 12`

## Hints

### Hint 1

Build the string one character at a time, tracking how many '(' and ')' have been placed.

### Hint 2

You may append '(' only while fewer than n opening brackets have been placed.

### Hint 3

You may append ')' only when it would not make the closings outnumber the openings so far.

### Hint 4

When the string reaches length 2n it is a complete well-formed combination; record it and backtrack.
