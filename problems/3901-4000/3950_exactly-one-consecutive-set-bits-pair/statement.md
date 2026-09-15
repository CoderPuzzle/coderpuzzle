# Exactly One Consecutive Set Bits Pair

## Description

You are given an integer `n`.

Return `true` if its binary representation contains exactly one adjacent pair
of set bits, and `false` otherwise.

### Example 1

```text
Input: n = 6
Output: true
Explanation:
    Binary representation of 6 is 110.
    There is exactly one adjacent pair of set bits ("11").
    Thus, the answer is true.
```

### Example 2

```text
Input: n = 5
Output: false
Explanation:
    Binary representation of 5 is 101.
    There is no adjacent pair of set bits.
    Thus, the answer is false.
```

### Constraints

- `0 <= n <= 10⁵`

## Hints

### Hint 1

Pure simulation problem.
