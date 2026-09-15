# Maximum Product of Word Lengths

## Description

Given a string array `words`, return the maximum value of
`length(word[i]) * length(word[j])` where the two words do not share common
letters. If no such two words exist, return `0`.

### Example 1

```text
Input: words = ["abcw","baz","foo","bar","xtfn","abcdef"]
Output: 16
Explanation: The two words can be "abcw", "xtfn".
```

### Example 2

```text
Input: words = ["a","ab","abc","d","cd","bcd","abcd"]
Output: 4
Explanation: The two words can be "ab", "cd".
```

### Example 3

```text
Input: words = ["a","aa","aaa","aaaa"]
Output: 0
Explanation: No such pair of words.
```

### Constraints

- `2 <= words.length <= 1000`
- `1 <= words[i].length <= 1000`
- `words[i]` consists only of lowercase English letters.

## Hints

### Hint 1

Only the set of distinct letters in each word matters, not their order or multiplicity.

### Hint 2

Represent each word's letter set as a 26-bit mask; two words share no common letters exactly when the AND of their masks is 0.

### Hint 3

With n up to 1000, comparing all pairs of masks is only about half a million cheap integer operations.
