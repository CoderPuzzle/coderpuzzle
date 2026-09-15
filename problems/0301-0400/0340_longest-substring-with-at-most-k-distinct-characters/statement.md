# Longest Substring with At Most K Distinct Characters

## Description

Given a string `s` and an integer `k`, return the length of the longest
substring of `s` that contains at most `k` distinct characters.

### Example 1

```text
Input: s = "eceba", k = 2
Output: 3
Explanation: The substring is "ece" with length 3.
```

### Example 2

```text
Input: s = "aa", k = 1
Output: 2
Explanation: The substring is "aa" with length 2.
```

### Constraints

- `1 <= s.length <= 5 * 10^4`
- `0 <= k <= 50`

## Hints

### Hint 1

Maintain a sliding window together with a hashmap counting the occurrences of each character inside the window.

### Hint 2

Expand the right end one character at a time; whenever the window holds more than k distinct characters, shrink it from the left until it is valid again.

### Hint 3

Track the maximum valid window length seen — that maximum is the answer.
