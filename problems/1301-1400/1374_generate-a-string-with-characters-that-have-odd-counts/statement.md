# Generate a String With Characters That Have Odd Counts

## Description

Given an integer `n`, return a string with `n` characters such that each
character in such string occurs an odd number of times.

The returned string must contain only lowercase English letters. If there are
multiple valid strings, return any of them.

The judge checks the returned string against the fixed canonical answer
described in the Examples: for even `n`, `(n-1)` copies of `'a'` followed by
one `'b'`; for odd `n`, `n` copies of `'a'`.

### Example 1

```text
Input: n = 4
Output: "aaab"
Explanation: "aaab" is a valid answer since the character 'a' occurs three
times and the character 'b' occurs once. Note that there are many other valid
strings such as "pppz" — any of them would be accepted on the original problem,
but the expected outputs here follow the canonical construction above.
```

### Example 2

```text
Input: n = 2
Output: "ab"
Explanation: "ab" is a valid answer since both 'a' and 'b' occur once.
```

### Example 3

```text
Input: n = 7
Output: "aaaaaaa"
```

### Constraints

- `1 <= n <= 500`

## Hints

### Hint 1

If n is odd, return a string of size n formed only by 'a'; else return a string
formed with n-1 'a' and 1 'b'.
