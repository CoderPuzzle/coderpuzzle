# Lexicographically Smallest String After Applying Operations

## Description

You are given a digit string `s` of even length, along with two integers
`a` and `b`.

You may apply either of the following two operations any number of
times, in any order:

- Add `a` to every digit at an odd index of `s` (0-indexed). Any digit
  that goes past `9` wraps back around to `0`. For example, if
  `s = "3456"` and `a = 5`, `s` becomes `"3951"`.
- Rotate `s` to the right by `b` positions. For example, if
  `s = "3456"` and `b = 1`, `s` becomes `"6345"`.

Return the lexicographically smallest string obtainable by applying the
above operations on `s` any number of times, in any order.

A string `x` is lexicographically smaller than a string `y` of the same
length if, at the first position where `x` and `y` differ, `x` has a
digit that is numerically smaller than the corresponding digit in `y`.

### Example 1

```text
Input: s = "5525", a = 9, b = 2
Output: "2050"
Explanation: One sequence of operations that reaches it:
Start:  "5525"
Rotate: "2555"
Add:    "2454"
Add:    "2353"
Rotate: "5323"
Add:    "5222"
Add:    "5121"
Rotate: "2151"
Add:    "2050"
There is no way to obtain a string that is lexicographically smaller
than "2050".
```

### Example 2

```text
Input: s = "74", a = 5, b = 1
Output: "24"
Explanation: One sequence of operations that reaches it:
Start:  "74"
Rotate: "47"
Add:    "42"
Rotate: "24"
There is no way to obtain a string that is lexicographically smaller
than "24".
```

### Example 3

```text
Input: s = "0011", a = 4, b = 2
Output: "0011"
Explanation: No sequence of operations produces a string
lexicographically smaller than "0011".
```

### Constraints

- `2 <= s.length <= 100`
- `s.length` is even
- `s` consists only of digits from `0` to `9`
- `1 <= a <= 9`
- `1 <= b <= s.length - 1`

## Hints

### Hint 1

Since the length of `s` is even, the number of distinct strings reachable
by any sequence of operations is bounded — repeatedly adding `a` to the
same positions cycles back after at most 10 applications, and repeatedly
rotating by `b` cycles back after at most `s.length` applications.

### Hint 2

You can generate every reachable string and take the lexicographic
minimum.

### Hint 3

Keep track of strings already generated so the same one is never
processed twice.
