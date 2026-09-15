# String Compression II

## Description

Run-length encoding compresses a string by replacing every maximal run of
identical characters (a run of length `2` or more) with the character
followed by the run's length. For example, `"aabccc"` becomes `"a2bc3"`:
`"aa"` becomes `"a2"` and `"ccc"` becomes `"c3"`. A run of length `1` is
written as just the character, with no trailing `1`.

Given a string `s` and an integer `k`, you may delete at most `k`
characters from `s` before encoding it. Return the minimum possible
length of the run-length encoded version of `s` after deleting at most
`k` characters, choosing the deletions to make the encoding as short as
possible.

### Example 1

```text
Input: s = "aaabcccd", k = 2
Output: 4
Explanation: Compressing s without deleting anything gives "a3bc3d" of
length 6. Deleting either 'b' or 'd' alone would shrink the encoding to
5. Deleting both 'b' and 'd' instead leaves "aaaccc", which compresses to
"a3c3" of length 4 — the best achievable with only 2 deletions.
```

### Example 2

```text
Input: s = "aabbaa", k = 2
Output: 2
Explanation: Deleting both 'b' characters leaves "aaaa", which
compresses to "a4" of length 2.
```

### Example 3

```text
Input: s = "aaaaaaaaaaa", k = 0
Output: 3
Explanation: With k = 0 no deletions are allowed. The compressed string
is "a11" of length 3.
```

### Constraints

- `1 <= s.length <= 100`
- `0 <= k <= s.length`
- `s` consists only of lowercase English letters.

## Hints

### Hint 1

Use dynamic programming.

### Hint 2

Let the DP state be the current index into `s` and the number of
deletions still available.

### Hint 3

For a fixed starting index and character, precompute (or scan on the
fly) how many deletions are needed to merge every later occurrence of
that character within a range into one run.
