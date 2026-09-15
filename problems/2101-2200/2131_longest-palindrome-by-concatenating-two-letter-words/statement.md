# Longest Palindrome by Concatenating Two Letter Words

## Description

You are given an array of strings `words`. Each element of `words` consists of two lowercase English letters.

Create the longest possible palindrome by selecting some elements from `words` and concatenating them in any order. Each element can be selected at most once.

Return the length of the longest palindrome that you can create. If it is impossible to create any palindrome, return `0`.

A palindrome is a string that reads the same forward and backward.

### Example 1

```text
Input: words = ["lc","cl","gg"]
Output: 6
Explanation: One longest palindrome is "lc" + "gg" + "cl" = "lcggcl", of length 6.
Note that "clgglc" is another longest palindrome that can be created.
```

### Example 2

```text
Input: words = ["ab","ty","yt","lc","cl","ab"]
Output: 8
Explanation: One longest palindrome is "ty" + "lc" + "cl" + "yt" = "tylcclyt", of length 8.
Note that "lcyttycl" is another longest palindrome that can be created.
```

### Example 3

```text
Input: words = ["cc","ll","xx"]
Output: 2
Explanation: One longest palindrome is "cc", of length 2.
Note that "ll" is another longest palindrome that can be created, and so is "xx".
```

### Constraints

- `1 <= words.length <= 10⁵`
- `words[i].length == 2`
- `words[i]` consists of lowercase English letters.

## Hints

### Hint 1

A palindrome must be mirrored over the center. Suppose we have a palindrome. If we prepend the word `"ab"` on the left, what must we append on the right to keep it a palindrome?

### Hint 2

We must append `"ba"` on the right. The number of times we can do this is the minimum of occurrences of `"ab"` and occurrences of `"ba"`.

### Hint 3

For words that are already palindromes, for example `"aa"`, we can prepend and append these in pairs as described in the previous hint. We can also use exactly one in the middle to form an even longer palindrome.
