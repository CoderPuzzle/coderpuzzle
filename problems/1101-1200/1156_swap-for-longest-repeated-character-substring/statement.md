# Swap For Longest Repeated Character Substring

## Description

You are given a string `text`. You can swap two of the characters in the text.

Return the length of the longest substring with repeated characters.

### Example 1

```text
Input: text = "ababa"
Output: 3
Explanation: We can swap the first 'b' with the last 'a', or the last 'b' with the first 'a'. Then, the longest repeated character substring is "aaa" with length 3.
```

### Example 2

```text
Input: text = "aaabaaa"
Output: 6
Explanation: Swap 'b' with the last 'a' (or the first 'a'), and we get longest repeated character substring "aaaaaa" with length 6.
```

### Example 3

```text
Input: text = "aaaaa"
Output: 5
Explanation: No need to swap, longest repeated character substring is "aaaaa" with length is 5.
```

### Constraints

- `1 <= text.length <= 2 * 10^4`
- `text` consists of lowercase English characters only.

## Hints

### Hint 1

There are two cases: a single run of one character, or two runs of the same character separated by exactly one different character.

### Hint 2

A run-length encoded version of the string makes both cases easy to check.

### Hint 3

A run can only be extended by one swapped character if that character actually occurs elsewhere in the text.
