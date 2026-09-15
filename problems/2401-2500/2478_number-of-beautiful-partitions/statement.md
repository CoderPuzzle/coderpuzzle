# Number of Beautiful Partitions

## Description

You are given a string `s` that consists of the digits `'1'` to `'9'` and two
integers `k` and `minLength`.

A partition of `s` is called beautiful if:

- `s` is partitioned into `k` non-intersecting substrings.
- Each substring has a length of at least `minLength`.
- Each substring starts with a prime digit and ends with a non-prime digit.
  Prime digits are `'2'`, `'3'`, `'5'`, and `'7'`, and the rest of the digits
  are non-prime.

Return the number of beautiful partitions of `s`. Since the answer may be very
large, return it modulo `10⁹ + 7`.

A substring is a contiguous sequence of characters within a string.

### Example 1

```text
Input: s = "23542185131", k = 3, minLength = 2
Output: 3
Explanation: There exists three ways to create a beautiful partition:
"2354 | 218 | 5131"
"2354 | 21851 | 31"
"2354218 | 51 | 31"
```

### Example 2

```text
Input: s = "23542185131", k = 3, minLength = 3
Output: 1
Explanation: There exists one way to create a beautiful partition: "2354 | 218 | 5131".
```

### Example 3

```text
Input: s = "3312958", k = 3, minLength = 1
Output: 1
Explanation: There exists one way to create a beautiful partition: "331 | 29 | 58".
```

### Constraints

- `1 <= k, minLength <= s.length <= 1000`
- `s` consists of the digits `'1'` to `'9'`.

## Hints

### Hint 1

Think about where a substring may be cut: each part must start with a prime digit and end with a non-prime digit.

### Hint 2

Let dp[i][j] be the number of ways to partition the first i characters into j beautiful substrings.

### Hint 3

Transition by fixing the end of the previous substring; use a prefix sum of dp over prime-starting positions to make the transition fast.
