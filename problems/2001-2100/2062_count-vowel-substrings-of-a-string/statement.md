# Count Vowel Substrings of a String

## Description

A substring is a contiguous (non-empty) sequence of characters within a string.

A vowel substring is a substring that only consists of vowels ('a', 'e', 'i', 'o', and 'u') and has all five vowels present in it.

Given a string word, return the number of vowel substrings in word.

### Example 1

```text
Input: word = "aeiouu"
Output: 2
Explanation: The vowel substrings of word are as follows (underlined):
- "aeiouu"
- "aeiouu"
```

### Example 2

```text
Input: word = "unicornarihan"
Output: 0
Explanation: Not all 5 vowels are present, so there are no vowel substrings.
```

### Example 3

```text
Input: word = "cuaieuouac"
Output: 7
Explanation: The vowel substrings of word are as follows (underlined):
- "cuaieuouac"
- "cuaieuouac"
- "cuaieuouac"
- "cuaieuouac"
- "cuaieuouac"
- "cuaieuouac"
- "cuaieuouac"
```

### Constraints

- `1 <= word.length <= 100`
- `word` consists of lowercase English letters only.

## Hints

### Hint 1

While generating substrings starting at any index, do you need to continue generating larger substrings if you encounter a consonant?

### Hint 2

Can you store the count of characters to avoid generating substrings altogether?
