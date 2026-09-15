# Count Caesar Cipher Pairs

## Description

You are given an array words of n strings. Each string has length m and
contains only lowercase English letters.

Two strings s and t are similar if we can apply the following operation any
number of times (possibly zero times) so that s and t become equal.

- Choose either s or t.
- Replace every letter in the chosen string with the next letter in the
  alphabet cyclically. The next letter after 'z' is 'a'.

Count the number of pairs of indices (i, j) such that:

- i < j
- words[i] and words[j] are similar.

Return an integer denoting the number of such pairs.

### Example 1

```text
Input: words = ["fusion","layout"]
Output: 1
Explanation: words[0] = "fusion" and words[1] = "layout" are similar because
we can apply the operation to "fusion" 6 times. The string "fusion" changes
as follows.

"fusion"
"gvtjpo"
"hwukqp"
"ixvlrq"
"jywmsr"
"kzxnts"
"layout"
```

### Example 2

```text
Input: words = ["ab","aa","za","aa"]
Output: 2
Explanation: words[0] = "ab" and words[2] = "za" are similar. words[1] = "aa"
and words[3] = "aa" are similar.
```

### Constraints

- `1 <= n == words.length <= 10⁵`
- `1 <= m == words[i].length <= 10⁵`
- `1 <= n * m <= 10⁵`
- `words[i]` consists only of lowercase English letters.

## Hints

### Hint 1

Two strings are similar if the differences between consecutive characters
(mod 26) are the same; normalize each string by shifting its first character
to 'a'.

### Hint 2

Compute a hashable key for each normalized string representing its relative
character differences.

### Hint 3

Use a map to count how many strings share the same normalized key.
