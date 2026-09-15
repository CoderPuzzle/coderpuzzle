# Check If Word Is Valid After Substitutions

## Description

Given a string `s`, determine if it is valid.

A string `s` is valid if, starting with an empty string `t = ""`, you can
transform `t` into `s` after performing the following operation any number
of times:

Insert string `"abc"` into any position in `t`. More formally, `t`
becomes `tleft + "abc" + tright`, where `t == tleft + tright`. Note that
`tleft` and `tright` may be empty.

Return `true` if `s` is a valid string, otherwise, return `false`.

### Example 1

```text
Input: s = "aabcbc"
Output: true
Explanation:
"" -> "abc" -> "aabcbc"
Thus, "aabcbc" is valid.
```

### Example 2

```text
Input: s = "abcabcababcc"
Output: true
Explanation:
"" -> "abc" -> "abcabc" -> "abcabcabc" -> "abcabcababcc"
Thus, "abcabcababcc" is valid.
```

### Example 3

```text
Input: s = "abccba"
Output: false
Explanation: It is impossible to get "abccba" using the operation.
```

### Constraints

- `1 <= s.length <= 2 * 10^4`
- `s` consists of letters `'a'`, `'b'`, and `'c'`.
