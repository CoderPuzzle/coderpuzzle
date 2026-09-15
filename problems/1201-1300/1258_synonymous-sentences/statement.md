# Synonymous Sentences

## Description

You are given a list of equivalent string pairs `synonyms` where
`synonyms[i] = [si, ti]` indicates that `si` and `ti` are equivalent strings.
You are also given a sentence `text`.

Return all possible synonymous sentences sorted lexicographically.

### Example 1

```text
Input: synonyms = [["happy","joy"],["sad","sorrow"],["joy","cheerful"]], text = "I am happy today but was sad yesterday"
Output: ["I am cheerful today but was sad yesterday","I am cheerful today but was sorrow yesterday","I am happy today but was sad yesterday","I am happy today but was sorrow yesterday","I am joy today but was sad yesterday","I am joy today but was sorrow yesterday"]
```

### Example 2

```text
Input: synonyms = [["happy","joy"],["cheerful","glad"]], text = "I am happy today but was sad yesterday"
Output: ["I am happy today but was sad yesterday","I am joy today but was sad yesterday"]
```

### Constraints

- `0 <= synonyms.length <= 10`
- `synonyms[i].length == 2`
- `1 <= si.length, ti.length <= 10`
- `si != ti`
- `text` consists of at most `10` words.
- All the pairs of synonyms are unique.
- The words of `text` are separated by single spaces.

## Hints

### Hint 1

Find all synonymous groups of words.

### Hint 2

Use union-find data structure.

### Hint 3

By backtracking, generate all possible statements.
