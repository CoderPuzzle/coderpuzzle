# Word Break II

## Description

Given a string `s` and a dictionary of strings `wordDict`, add spaces in `s` to
construct a sentence where each word is a valid dictionary word. Return all
such possible sentences.

Note that the same word in the dictionary may be reused multiple times in the
segmentation.

For a deterministic answer, return the sentences in the order the examples
show: sentences are compared by their last word, the shorter last word first,
and sentences that share their last word are ordered the same way by the words
before it.

### Example 1

```text
Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
Output: ["cats and dog","cat sand dog"]
```

### Example 2

```text
Input: s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]
Output: ["pine apple pen apple","pineapple pen apple","pine applepen apple"]
Explanation: Note that you are allowed to reuse a dictionary word.
```

### Example 3

```text
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: []
```

### Constraints

- `1 <= s.length <= 20`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 10`
- `s` and `wordDict[i]` consist of only lowercase English letters.
- All the strings of `wordDict` are **unique**.
- The input is generated in a way that the length of the answer doesn't exceed
  `10⁵`.
