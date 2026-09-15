# Check If a String Contains All Binary Codes of Size K

## Description

Given a binary string `s` and an integer `k`, return `true` if every
binary code of length `k` is a substring of `s`. Otherwise, return `false`.

### Example 1

```text
Input: s = "00110110", k = 2
Output: true
Explanation: The binary codes of length 2 are "00", "01", "10" and "11". They can be all found as substrings at indices 0, 1, 3 and 2 respectively.
```

### Example 2

```text
Input: s = "0110", k = 1
Output: true
Explanation: The binary codes of length 1 are "0" and "1", it is clear that both exist as a substring.
```

### Example 3

```text
Input: s = "0110", k = 2
Output: false
Explanation: The binary code "00" is of length 2 and does not exist in the array.
```

### Constraints

- `1 <= s.length <= 5 * 10^5`
- `s[i]` is either `'0'` or `'1'`.
- `1 <= k <= 20`

## Hints

### Hint 1

Only the substrings of length k matter; slide a window of size k across s.

### Hint 2

The number of distinct substrings of length k must be exactly 2^k.

### Hint 3

You can stop early once you have seen 2^k distinct codes; a rolling hash (or bit mask) avoids slicing substrings.
