# Find All Anagrams in a String

## Description

Given two strings `s` and `p`, return an array of all the start indices of
`p`'s anagrams in `s`. You may return the answer in any order.

### Example 1

```text
Input: s = "cbaebabacd", p = "abc"
Output: [0,6]
Explanation:
The substring with start index = 0 is "cba", which is an anagram of "abc".
The substring with start index = 6 is "bac", which is an anagram of "abc".
```

### Example 2

```text
Input: s = "abab", p = "ab"
Output: [0,1,2]
Explanation:
The substring with start index = 0 is "ab", which is an anagram of "ab".
The substring with start index = 1 is "ba", which is an anagram of "ab".
The substring with start index = 2 is "ab", which is an anagram of "ab".
```

### Constraints

- `1 <= s.length, p.length <= 3 * 10^4`
- `s` and `p` consist of lowercase English letters.

## Hints

### Hint 1

A window of fixed length len(p) is an anagram exactly when its character counts equal p's counts.

### Hint 2

Slide the window one character at a time: add the entering character and remove the leaving one so each step is O(1).

### Hint 3

Compare against p's counter — or track a mismatch count so you never compare full 26-slot arrays per step.
