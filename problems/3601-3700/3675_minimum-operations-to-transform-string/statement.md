# Minimum Operations to Transform String

## Description

You are given a string `s` consisting only of lowercase English letters.

In one operation you pick any letter that occurs in `s` and replace every
occurrence of it with the next lowercase letter of the alphabet. The
alphabet is circular, so `z` wraps around to `a`. Operations may be
performed any number of times, including zero.

Return the minimum number of operations required to turn `s` into a string
consisting only of `'a'` characters.

### Example 1

```text
Input: s = "yz"
Output: 2
Explanation: Advance the y first and the string becomes "zz"; advancing
the z now carries both characters, and one more operation wraps them
around to "aa".
```

### Example 2

```text
Input: s = "a"
Output: 0
Explanation: The string already consists only of 'a' characters, so no
operation is needed.
```

### Constraints

- `1 <= s.length <= 5 * 10⁵`
- `s` consists only of lowercase English letters.

## Hints

### Hint 1

One operation shifts every copy of the chosen letter forward by one step,
wrapping from `z` back to `a`.

### Hint 2

A letter whose zero-based alphabet index is `i` needs `(26 - i) % 26`
forward steps of its own to become `a`.

### Hint 3

Advance the letters that need the most steps first: when a moving letter
catches up to another present letter, the two travel together from then
on, so the merged letter rides along for free. The minimum number of
operations is therefore the largest per-letter step count among the
letters appearing in `s`.
