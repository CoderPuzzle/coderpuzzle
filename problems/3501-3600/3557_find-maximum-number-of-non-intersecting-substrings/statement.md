# Find Maximum Number of Non Intersecting Substrings

## Description

You are given a string `word`.

Return the maximum number of non-intersecting substrings of `word` that are
at least four characters long and start and end with the same letter.

### Example 1

```text
Input: word = "abcdeafdef"
Output: 2
Explanation:
The two substrings are "abcdea" and "fdef".
```

### Example 2

```text
Input: word = "bcdaaaab"
Output: 1
Explanation:
The only substring is "aaaa". Note that we cannot also choose "bcdaaaab"
since it intersects with the other substring.
```

### Constraints

- `1 <= word.length <= 2 * 10⁵`
- `word` consists only of lowercase English letters.

## Hints

### Hint 1

Can we solve the problem using Dynamic Programming?

### Hint 2

For each character c, store all occurrence indices in order

### Hint 3

At each position i, let j be the first index of word[i]; if i - j >= 3, we
can form substring [j, i]

### Hint 4

For each index, also store the maximum for any substring ending before that
index in the dp.
