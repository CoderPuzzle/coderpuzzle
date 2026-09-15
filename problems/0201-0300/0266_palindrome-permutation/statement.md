# Palindrome Permutation

## Description

Given a string `s`, return `true` if a permutation of the string could form a
palindrome and `false` otherwise.

### Example 1

```text
Input: s = "code"
Output: false
```

### Example 2

```text
Input: s = "aab"
Output: true
```

### Example 3

```text
Input: s = "carerac"
Output: true
```

### Constraints

- `1 <= s.length <= 5000`
- `s` consists of only lowercase English letters.

## Hints

### Hint 1

Consider the palindromes of odd vs even length. What difference do you notice?

### Hint 2

Count the frequency of each character.

### Hint 3

If each character occurs even number of times, then it must be a palindrome. How about character which occurs odd number of times?
