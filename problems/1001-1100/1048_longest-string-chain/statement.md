# Longest String Chain

## Description

You are given an array of `words` where each word consists of lowercase
English letters.

`wordA` is a predecessor of `wordB` if and only if we can insert exactly one
letter anywhere in `wordA` without changing the order of the other characters
to make it equal to `wordB`.

- For example, `"abc"` is a predecessor of `"abac"`, while `"cba"` is not a
  predecessor of `"bcad"`.

A word chain is a sequence of words `[word1, word2, ..., wordk]` with
`k >= 1`, where `word1` is a predecessor of `word2`, `word2` is a predecessor
of `word3`, and so on. A single word is trivially a word chain with `k == 1`.

Return the length of the longest possible word chain with words chosen from
the given list of words.

### Example 1

```text
Input: words = ["a","b","ba","bca","bda","bdca"]
Output: 4
Explanation: One of the longest word chains is ["a","ba","bda","bdca"].
```

### Example 2

```text
Input: words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
Output: 5
Explanation: All the words can be put in a word chain
["xb","xbc","cxbc","pcxbc","pcxbcf"].
```

### Example 3

```text
Input: words = ["abcd","dbqca"]
Output: 1
Explanation: The trivial word chain ["abcd"] is one of the longest word
chains. ["abcd","dbqca"] is not a valid word chain because the ordering of
the letters is changed.
```

### Constraints

- `1 <= words.length <= 1000`
- `1 <= words[i].length <= 16`
- `words[i]` only consists of lowercase English letters.

## Hints

### Hint 1

Instead of adding a character to build longer words, try deleting one character to look up shorter predecessors.

### Hint 2

Process the words in order of increasing length; for each word, try deleting each position and look up the resulting predecessor in a hash map.

### Hint 3

The chain length of a word is one more than the best chain length among its deletable predecessors.
