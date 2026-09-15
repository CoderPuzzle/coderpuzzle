# Number of Good Ways to Split a String

## Description

You are given a string `s`.

A split of `s` is a choice of two non-empty strings `sleft` and `sright`
whose concatenation equals `s` (that is, `sleft + sright = s`). A split is
called **good** if the number of distinct letters in `sleft` equals the
number of distinct letters in `sright`.

Return the number of good splits you can make in `s`.

### Example 1

```text
Input: s = "aacaba"
Output: 2
Explanation: There are 5 ways to split "aacaba" and 2 of them are good.
("a", "acaba") Left and right strings contain 1 and 3 distinct letters
respectively.
("aa", "caba") Left and right strings contain 1 and 3 distinct letters
respectively.
("aac", "aba") Left and right strings contain 2 and 2 distinct letters
respectively (good split).
("aaca", "ba") Left and right strings contain 2 and 2 distinct letters
respectively (good split).
("aacab", "a") Left and right strings contain 3 and 1 distinct letters
respectively.
```

### Example 2

```text
Input: s = "abcd"
Output: 1
Explanation: Split the string as ("ab", "cd"). Left and right strings
each contain 2 distinct letters.
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` consists of only lowercase English letters.

## Hints

### Hint 1

Use two hash maps (or fixed-size arrays) to track the counts of distinct
letters in the left and right substring divided by the current index.
