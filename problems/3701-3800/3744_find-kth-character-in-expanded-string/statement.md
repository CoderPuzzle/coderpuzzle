# Find Kth Character in Expanded String

## Description

You are given a string `s` made of one or more words separated by single
spaces, where every word consists of lowercase English letters.

The expanded string `t` is built from `s` as follows: within each word, the
first character is written once, the second character twice, the third three
times, and so on. Spaces are carried over unchanged, each contributing exactly
one character. For example, from `s = "hello world"` you get
`t = "heelllllllooooo woorrrllllddddd"`.

Given an integer `k` that names a valid index of `t`, return the character of
`t` at index `k` (0-indexed).

### Example 1

```text
Input: s = "hello world", k = 0
Output: "h"
Explanation: t = "heelllllllooooo woorrrllllddddd", so the answer is t[0] = "h".
```

### Example 2

```text
Input: s = "hello world", k = 15
Output: " "
Explanation: t = "heelllllllooooo woorrrllllddddd", so the answer is t[15] = " ".
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` consists of lowercase English letters and spaces `' '`.
- `s` has no leading or trailing spaces.
- The words of `s` are separated by a single space.
- `0 <= k < t.length` — `k` always names a valid index into `t`.

## Hints

### Hint 1

A word's character at offset `i` (0-based) is repeated `i + 1` times in `t`,
so each character owns a block of copies whose size follows directly from its
offset.

### Hint 2

Walk through `s` and subtract each character's block size from `k` until `k`
falls inside the block you are standing on.

### Hint 3

Treat every space as a block of one and reset the offset counter when a new
word begins. Note that `t` can be far longer than `s`, so building it is not
an option.
