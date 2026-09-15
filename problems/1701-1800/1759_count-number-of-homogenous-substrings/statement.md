# Count Number of Homogenous Substrings

## Description

Given a string `s`, return the number of homogenous substrings of `s`.
Since the answer may be too large, return it modulo `10^9 + 7`.

A string is homogenous if all the characters of the string are the
same.

A substring is a contiguous sequence of characters within a string.

### Example 1

```text
Input: s = "abbcccaa"
Output: 13
Explanation: The homogenous substrings are listed as below:
"a"   appears 3 times.
"aa"  appears 1 time.
"b"   appears 2 times.
"bb"  appears 1 time.
"c"   appears 3 times.
"cc"  appears 2 times.
"ccc" appears 1 time.
3 + 1 + 2 + 1 + 3 + 2 + 1 = 13.
```

### Example 2

```text
Input: s = "xy"
Output: 2
Explanation: The homogenous substrings are "x" and "y".
```

### Example 3

```text
Input: s = "zzzzz"
Output: 15
```

### Constraints

- `1 <= s.length <= 10^5`
- `s` consists of lowercase letters.

## Hints

### Hint 1

A string of only 'a's of length k contains k + 1 choose 2 homogenous
substrings.

### Hint 2

Split the string into substrings where each substring contains only
one letter, and apply the formula on each substring's length.
