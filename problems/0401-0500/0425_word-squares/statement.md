# Word Squares

## Description

Given an array of unique strings `words`, return all the word squares you can build from `words`. The same word from `words` can be used multiple times. You can return the answer in any order.

A sequence of strings forms a valid word square if the kth row and column read the same string, where `0 <= k < max(numRows, numColumns)`.

For example, the word sequence `["ball","area","lead","lady"]` forms a word square because each word reads the same both horizontally and vertically.

### Example 1

```text
Input: words = ["area","lead","wall","lady","ball"]
Output: [["ball","area","lead","lady"],["wall","area","lead","lady"]]
Explanation: The output consists of two word squares. The order of output does not matter (just the order of words in each word square matters).
```

### Example 2

```text
Input: words = ["abat","baba","atan","atal"]
Output: [["baba","abat","baba","atal"],["baba","abat","baba","atan"]]
Explanation: The output consists of two word squares. The order of output does not matter (just the order of words in each word square matters).
```

### Constraints

- `1 <= words.length <= 1000`
- `1 <= words[i].length <= 4`
- All `words[i]` have the same length.
- `words[i]` consists of only lowercase English letters.
- All `words[i]` are unique.

## Hints

### Hint 1

Build the word square row by row; after placing the first k rows, the next word is fully determined by the characters already written in the kth column.

### Hint 2

Precompute a mapping from each prefix to the words that start with that prefix, so the candidates for each row can be looked up quickly.

### Hint 3

Backtracking with prefix pruning explores far fewer candidates than trying every permutation of words.
