# Word Break

## Description

Given a string `s` and a dictionary of strings `wordDict`, return
`true` if `s` can be segmented into a space-separated sequence of one or more
dictionary words.

Note that the same word in the dictionary may be reused multiple times in the
segmentation.

### Example 1

```text
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
```

### Example 2

```text
Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
```

### Example 3

```text
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
```

### Constraints

- `1 <= s.length <= 300`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 20`
- `s` and `wordDict[i]` consist of only lowercase English letters.
- All the strings of `wordDict` are **unique**.

## Hints

### Hint 1

Let reachable[i] be true when the prefix s[0..i) can be segmented; reachable[0] is true for the empty prefix.

### Hint 2

reachable[i] is true if some earlier reachable[j] has the substring s[j..i) in the dictionary.

### Hint 3

Store the words in a hash set so each substring membership test costs only its length.
