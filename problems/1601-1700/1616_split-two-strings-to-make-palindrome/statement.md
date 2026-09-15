# Split Two Strings to Make Palindrome

## Description

You are given two strings `a` and `b` of the same length. Choose an
index and split **both** strings at that same index: splitting `a`
into `aprefix` and `asuffix`, where `a = aprefix + asuffix`, and
splitting `b` into `bprefix` and `bsuffix`, where `b = bprefix +
bsuffix`.

When a string `s` is split into `sprefix` and `ssuffix`, either part
is allowed to be empty. For example, if `s = "abc"`, the valid splits
are `"" + "abc"`, `"a" + "bc"`, `"ab" + "c"`, and `"abc" + ""`.

Return `true` if there is some split index at which either
`aprefix + bsuffix` or `bprefix + asuffix` forms a palindrome,
otherwise return `false`. Here `x + y` denotes the concatenation of
strings `x` and `y`.

### Example 1

```text
Input: a = "x", b = "y"
Output: true
Explanation: If either a or b is itself a palindrome the answer is
true, since splitting at index 0 gives aprefix = "" and bsuffix = "y",
and aprefix + bsuffix = "y", which is a palindrome.
```

### Example 2

```text
Input: a = "xbdef", b = "xecab"
Output: false
```

### Example 3

```text
Input: a = "ulacfd", b = "jizalu"
Output: true
Explanation: Split them at index 3: aprefix = "ula", asuffix = "cfd",
bprefix = "jiz", bsuffix = "alu". Then aprefix + bsuffix =
"ula" + "alu" = "ulaalu", which is a palindrome.
```

### Constraints

- `1 <= a.length, b.length <= 10^5`
- `a.length == b.length`
- `a` and `b` consist of lowercase English letters.

## Hints

### Hint 1

Try finding the largest prefix from `a` that matches a suffix in `b`.

### Hint 2

Try string matching.
