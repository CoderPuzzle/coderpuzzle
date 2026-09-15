# Minimum Time to Activate String

## Description

You are given a string `s` of length `n` and an integer array `order`, where
`order` is a permutation of the numbers in the range `[0, n - 1]`.

Time starts at `t = 0`; at each step `t`, the character at index `order[t]`
of `s` is replaced with `'*'` and stays replaced.

A substring of `s` is valid if it contains at least one `'*'`.

The string `s` is active once the total number of valid substrings is
greater than or equal to `k`.

Return the minimum time `t` at which `s` becomes active. If it never becomes
active, return `-1`.

### Example 1

```text
Input: s = "abc", order = [1,0,2], k = 2
Output: 0
Explanation: The first replacement turns s into "a*c". The substrings "*",
"a*", "*c", and "a*c" all contain a '*', so there are already 4 valid
substrings and 4 >= k = 2. The answer is 0.
```

### Example 2

```text
Input: s = "cat", order = [0,2,1], k = 6
Output: 2
Explanation: After t = 0 ("*at") there are 3 valid substrings; after
t = 1 ("*a*") there are 5; after t = 2 ("***") every substring contains a
'*' and the count of 6 finally reaches k. The answer is 2.
```

### Example 3

```text
Input: s = "xy", order = [0,1], k = 4
Output: -1
Explanation: A length-2 string has only 3 substrings in total, so even with
both characters replaced the count of valid substrings can never reach
k = 4. The answer is -1.
```

### Constraints

- `1 <= n == s.length <= 10⁵`
- `order.length == n`
- `0 <= order[i] <= n - 1`
- `s` consists of lowercase English letters.
- `order` is a permutation of the integers from `0` to `n - 1`.
- `1 <= k <= 10⁹`

## Hints

### Hint 1

The count of valid substrings only grows as replacements accumulate, so
binary-search on t: to test a time, star the first t + 1 entries of order,
subtract from n(n + 1) / 2 the L(L + 1) / 2 substrings hidden by each
maximal star-free run of length L, and compare the remainder against k.
