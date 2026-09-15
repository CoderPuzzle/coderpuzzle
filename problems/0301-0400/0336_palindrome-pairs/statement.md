# Palindrome Pairs

## Description

You are given a 0-indexed array of unique strings `words`.

A palindrome pair is a pair of integers `(i, j)` such that:

- `0 <= i, j < words.length`
- `i != j`
- `words[i] + words[j]` (the concatenation of the two strings) is a palindrome.

Return an array of all the palindrome pairs of `words`.

You must write an algorithm with `O(sum of words[i].length)` runtime complexity.

### Example 1

```text
Input: words = ["abcd","dcba","lls","s","sssll"]
Output: [[0,1],[1,0],[3,2],[2,4]]
Explanation: The palindromes are ["abcddcba","dcbaabcd","slls","llssssll"]
```

### Example 2

```text
Input: words = ["bat","tab","cat"]
Output: [[0,1],[1,0]]
Explanation: The palindromes are ["battab","tabbat"]
```

### Example 3

```text
Input: words = ["a",""]
Output: [[0,1],[1,0]]
Explanation: The palindromes are ["a","a"]
```

### Constraints

- `1 <= words.length <= 5000`
- `0 <= words[i].length <= 300`
- `words[i]` consists of lowercase English letters.

## Hints

### Hint 1

Checking every pair would take O(n² · k) time, which exceeds the limit — a faster approach is needed.

### Hint 2

If every string in the array is hashed, how can you check whether two strings form a palindrome after concatenation?

### Hint 3

Treat each word as words[j] (the suffix of the target palindrome) and look up whether a stored word can serve as the prefix that completes a palindrome.
