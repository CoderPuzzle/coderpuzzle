# Sort Vowels by Frequency

## Description

You are given a string `s` consisting of lowercase English characters.

Rearrange only the vowels in the string so that they appear in non-increasing
order of their frequency.

If multiple vowels have the same frequency, order them by the position of
their first occurrence in `s`.

Return the modified string.

Vowels are `'a'`, `'e'`, `'i'`, `'o'`, and `'u'`.

The frequency of a letter is the number of times it occurs in the string.

### Example 1

```text
Input: s = "leetcode"
Output: "leetcedo"
Explanation:
    Vowels in the string are ['e', 'e', 'o', 'e'] with frequencies: e = 3,
    o = 1.
    Sorting in non-increasing order of frequency and placing them back into
    the vowel positions results in "leetcedo".
```

### Example 2

```text
Input: s = "aeiaaioooa"
Output: "aaaaoooiie"
Explanation:
    Vowels in the string are ['a', 'e', 'i', 'a', 'a', 'i', 'o', 'o', 'o',
    'a'] with frequencies: a = 4, o = 3, i = 2, e = 1.
    Sorting them in non-increasing order of frequency and placing them back
    into the vowel positions results in "aaaaoooiie".
```

### Example 3

```text
Input: s = "baeiou"
Output: "baeiou"
Explanation:
    Each vowel appears exactly once, so all have the same frequency.
    Thus, they retain their relative order based on first occurrence, and the
    string remains unchanged.
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` consists of lowercase English letters

## Hints

### Hint 1

Simulate as described.
