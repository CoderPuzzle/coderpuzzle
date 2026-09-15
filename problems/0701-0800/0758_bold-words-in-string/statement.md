# Bold Words in String

## Description

Given an array of keywords `words` and a string `s`, make all appearances of
all keywords `words[i]` in `s` bold. Any letters between `<b>` and `</b>` tags
become bold.

Return `s` after adding the bold tags. The returned string should use the
least number of tags possible, and the tags should form a valid combination.

### Example 1

```text
Input: words = ["ab","bc"], s = "aabcd"
Output: "a<b>abc</b>d"
Explanation: Note that returning "a<b>a<b>b</b>c</b>d" would use more tags, so it is incorrect.
```

### Example 2

```text
Input: words = ["ab","cb"], s = "aabcd"
Output: "a<b>ab</b>cd"
```

### Constraints

- `1 <= s.length <= 500`
- `0 <= words.length <= 50`
- `1 <= words[i].length <= 10`
- `s` and `words[i]` consist of lowercase English letters.

## Hints

### Hint 1

First, determine which letters are bold and store that information in
`mask[i]` = whether the i-th character is bold. Then, insert the tags at the
beginning and end of groups. The start of a group is if and only if (`mask[i]`
and (`i == 0` or not `mask[i-1]`)), and the end of a group is similar.
