# Rearrange Spaces Between Words

## Description

You are given a string `text` of words placed among some number of spaces.
Each word consists of one or more lowercase English letters and is
separated from the next by at least one space. `text` is guaranteed to
contain at least one word.

Rearrange the spaces so that there is an equal number of spaces between
every pair of adjacent words, and that number is as large as possible. If
the spaces cannot be redistributed equally, place the extra spaces at the
end, so the returned string is the same length as `text`.

Return the string after rearranging the spaces.

### Example 1

```text
Input: text = "  this   is  a sentence "
Output: "this   is   a   sentence"
Explanation: There are 9 spaces in total and 4 words. The 9 spaces can be
evenly divided between the words: 9 / (4 - 1) = 3 spaces each.
```

### Example 2

```text
Input: text = " practice   makes   perfect"
Output: "practice   makes   perfect "
Explanation: There are 7 spaces in total and 3 words. 7 / (3 - 1) = 3
spaces each, with 1 extra space left over. That extra space goes at the
end of the string.
```

### Constraints

- `1 <= text.length <= 100`
- `text` consists of lowercase English letters and `' '`.
- `text` contains at least one word.

## Hints

### Hint 1

Count the total number of spaces and the number of words. Then use
integer division to determine how many spaces to place between each pair
of words, and how many are left over for the end.
