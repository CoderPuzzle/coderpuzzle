# Check if the Sentence Is Pangram

## Description

A pangram is a sentence where every letter of the English alphabet appears
at least once.

Given a string `sentence` containing only lowercase English letters, return
`true` if `sentence` is a pangram, or `false` otherwise.

### Example 1

```text
Input: sentence = "thequickbrownfoxjumpsoverthelazydog"
Output: true
Explanation: sentence contains at least one of every letter of the English alphabet.
```

### Example 2

```text
Input: sentence = "leetcode"
Output: false
```

### Constraints

- `1 <= sentence.length <= 1000`
- `sentence` consists of lowercase English letters.

## Hints

### Hint 1

Iterate over the string and mark each character as found (using a boolean array, bitmask, or any other similar way).

### Hint 2

Check if the number of found characters equals the alphabet length.
