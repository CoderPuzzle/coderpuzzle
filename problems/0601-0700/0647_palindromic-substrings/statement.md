# Palindromic Substrings

## Description

Given a string `s`, return the number of palindromic **substrings** in it.

A string is a **palindrome** when it reads the same backward as forward.

A **substring** is a contiguous sequence of characters within the string.

### Example 1

```text
Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
```

### Example 2

```text
Input: s = "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
```

### Constraints

- `1 <= s.length <= 1000`
- `s` consists of lowercase English letters.

## Hints

### Hint 1

How can we reuse a previously computed palindrome to compute a larger palindrome?

### Hint 2

If "aba" is a palindrome, is "xabax" a palindrome? Similarly, is "xabay" a palindrome?

### Hint 3

Checking every start/end pair with a full palindrome test costs O(n^3). Can you reuse previous computation to make each palindrome check O(1)?
