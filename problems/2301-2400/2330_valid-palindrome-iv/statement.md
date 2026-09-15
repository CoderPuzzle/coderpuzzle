# Valid Palindrome IV

## Description

You are given a 0-indexed string s consisting of only lowercase English letters. In one operation, you can change any character of s to any other character.

Return true if you can make s a palindrome after performing exactly one or two operations, or return false otherwise.

### Example 1

```text
Input: s = "abcdba"
Output: true
Explanation: One way to make s a palindrome using 1 operation is:
- Change s[2] to 'd'. Now, s = "abddba".
One operation could be performed to make s a palindrome so return true.
```

### Example 2

```text
Input: s = "aa"
Output: true
Explanation: One way to make s a palindrome using 2 operations is:
- Change s[0] to 'b'. Now, s = "ba".
- Change s[1] to 'b'. Now, s = "bb".
Two operations could be performed to make s a palindrome so return true.
```

### Example 3

```text
Input: s = "abcdef"
Output: false
Explanation: It is not possible to make s a palindrome using one or two operations so return false.
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` consists only of lowercase English letters.

## Hints

### Hint 1

Count the number of pairs of characters that should be equal if s were a palindrome, but are not equal.

### Hint 2

If the number of pairs is 0, then s is already palindrome. You can pick any pair of characters and change them both to a different character and s will stay a palindrome.
