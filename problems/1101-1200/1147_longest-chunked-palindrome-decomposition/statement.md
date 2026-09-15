# Longest Chunked Palindrome Decomposition

## Description

You are given a string `text`. You should split it into `k` substrings
(`subtext_1, subtext_2, ..., subtext_k`) such that:

- `subtext_i` is a non-empty string.
- The concatenation of all the substrings is equal to `text` (i.e.
  `subtext_1 + subtext_2 + ... + subtext_k == text`).
- `subtext_i == subtext_k-i+1` for all valid values of `i` (i.e. `1 <= i <= k`).

Return the largest possible value of `k`.

### Example 1

```text
Input: text = "ghiabcdefhelloadamhelloabcdefghi"
Output: 7
Explanation: We can split the string on "(ghi)(abcdef)(hello)(adam)(hello)(abcdef)(ghi)".
```

### Example 2

```text
Input: text = "merchant"
Output: 1
Explanation: We can split the string on "(merchant)".
```

### Example 3

```text
Input: text = "antaprezatepzapreanta"
Output: 11
Explanation: We can split the string on "(a)(nt)(a)(pre)(za)(tep)(za)(pre)(a)(nt)(a)".
```

### Constraints

- `1 <= text.length <= 1000`
- `text` consists only of lowercase English characters.

## Hints

### Hint 1

Compare the shortest prefix with the shortest suffix of the remaining text and greedily peel off matching pairs.

### Hint 2

Peeling the shortest match first is safe: it can never reduce the final number of chunks.

### Hint 3

A rolling hash can speed up the prefix/suffix comparisons, though plain comparison is fast enough here.
