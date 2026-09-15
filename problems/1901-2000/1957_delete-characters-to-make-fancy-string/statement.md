# Delete Characters to Make Fancy String

## Description

A fancy string is a string where no three consecutive characters are equal.

Given a string `s`, delete the minimum possible number of characters from `s`
to make it fancy.

Return the final string after the deletion. It can be shown that the answer
will always be unique.

### Example 1

```text
Input: s = "leeetcode"
Output: "leetcode"
Explanation: Remove an 'e' from the first group of 'e's to create
"leetcode". No three consecutive characters are equal, so return "leetcode".
```

### Example 2

```text
Input: s = "aaabaaaa"
Output: "aabaa"
Explanation: Remove an 'a' from the first group of 'a's to create
"aabaaaa". Remove two 'a's from the second group of 'a's to create "aabaa".
No three consecutive characters are equal, so return "aabaa".
```

### Example 3

```text
Input: s = "aab"
Output: "aab"
Explanation: No three consecutive characters are equal, so return "aab".
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` consists only of lowercase English letters.

## Hints

### Hint 1

What's the optimal way to delete characters if three or more consecutive
characters are equal?

### Hint 2

If three or more consecutive characters are equal, keep two of them and delete
the rest.
