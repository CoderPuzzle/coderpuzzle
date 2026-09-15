# Maximum Distance Between Unequal Words in Array I

## Description

You are given an array of strings `words`.

Pick two distinct indices `i < j` whose words differ, meaning `words[i] !=
words[j]`; that pair's distance is `j - i + 1`, counting both endpoints.
Return the largest distance any valid pair reaches. If no pair of unequal
words exists — the array holds a single word or every word is equal — return
`0`.

### Example 1

```text
Input: words = ["leetcode","leetcode","codeforces"]
Output: 3
Explanation: words[0] and words[2] are unequal, giving the maximum distance 2 - 0 + 1 = 3.
```

### Example 2

```text
Input: words = ["a","b","c","a","a"]
Output: 4
Explanation: words[1] and words[4] are unequal and give the largest distance, 4 - 1 + 1 = 4.
```

### Example 3

```text
Input: words = ["z","z","z"]
Output: 0
Explanation: Every word is equal, so no valid pair exists and the answer is 0.
```

### Constraints

- `1 <= words.length <= 100`
- `1 <= words[i].length <= 10`
- `words[i]` consists of only lowercase English letters.

## Hints

### Hint 1

A brute force that checks every pair of indices is enough.
