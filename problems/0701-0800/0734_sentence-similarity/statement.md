# Sentence Similarity

## Description

We can represent a sentence as an array of words: the sentence "I am happy
with leetcode" can be represented as the array
`["I","am","happy","with","leetcode"]`.

You are given two sentences, `sentence1` and `sentence2`, each represented as
a string array, and an array of string pairs `similarPairs`, where
`similarPairs[i] = [xi, yi]` indicates that the two words `xi` and `yi` are
similar.

Return `true` if `sentence1` and `sentence2` are similar, or `false` if they
are not similar.

Two sentences are similar if:

- they have the same length (i.e., the same number of words), and
- `sentence1[i]` and `sentence2[i]` are similar.

Notice that a word is always similar to itself. Also notice that the
similarity relation is not transitive: for example, if the words `a` and `b`
are similar, and the words `b` and `c` are similar, `a` and `c` are not
necessarily similar.

### Example 1

```text
Input: sentence1 = ["great","acting","skills"], sentence2 = ["fine","drama","talent"], similarPairs = [["great","fine"],["drama","acting"],["skills","talent"]]
Output: true
Explanation: The two sentences have the same length and each word i of
sentence1 is also similar to the corresponding word in sentence2.
```

### Example 2

```text
Input: sentence1 = ["great"], sentence2 = ["great"], similarPairs = []
Output: true
Explanation: A word is similar to itself.
```

### Example 3

```text
Input: sentence1 = ["great"], sentence2 = ["doubleplus","good"], similarPairs = [["great","doubleplus"]]
Output: false
Explanation: As they don't have the same length, we return false.
```

### Constraints

- `1 <= sentence1.length, sentence2.length <= 1000`
- `1 <= sentence1[i].length, sentence2[i].length <= 20`
- `sentence1[i]` and `sentence2[i]` consist of English letters.
- `0 <= similarPairs.length <= 1000`
- `similarPairs[i].length == 2`
- `1 <= xi.length, yi.length <= 20`
- `xi` and `yi` consist of lower-case and upper-case English letters.
- All the pairs `(xi, yi)` are distinct.

## Hints

### Hint 1

Two words `w1` and `w2` are similar if and only if `w1 == w2`, `(w1, w2)` was
a pair, or `(w2, w1)` was a pair.
