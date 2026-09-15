# Replace All ?'s to Avoid Consecutive Repeating Characters

## Description

You are given a string `s` that consists of lowercase English letters and
the character `'?'`. Replace every `'?'` in `s` with a lowercase English
letter so that the resulting string has no two consecutive characters
that are the same. You may not change any character that is not `'?'`.

It is guaranteed that, aside from the `'?'` characters, `s` never already
contains two consecutive repeating characters.

More than one replacement can make the string valid, and normally any of
them would be accepted, but to keep the expected output well defined,
use this fixed rule: process the string from left to right, and for each
`'?'`, try the letters `'a'`, `'b'`, and `'c'` in that order, replacing it
with the first letter that differs from the character immediately before
it (which has already been decided by this point) and, when the
character immediately after it is not itself `'?'`, from that character
as well.

Return the final string after every `'?'` has been replaced.

### Example 1

```text
Input: s = "?zs"
Output: "azs"
Explanation: Trying 'a' for the '?' works, since 'a' differs from the
following 'z' and there is no character before it.
```

### Example 2

```text
Input: s = "ubv?w"
Output: "ubvaw"
Explanation: Trying 'a' for the '?' works, since 'a' differs from both
the preceding 'v' and the following 'w'.
```

### Constraints

- `1 <= s.length <= 100`
- `s` consists of lowercase English letters and `'?'`.

## Hints

### Hint 1

Process the string from left to right. Whenever you reach a `'?'`, check
the character to its left and the character to its right, and pick a
replacement letter that differs from both.

### Hint 2

Take care to compare against the already-replaced value of a previous
`'?'`, not its original `'?'` character.
