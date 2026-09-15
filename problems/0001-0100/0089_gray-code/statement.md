# Gray Code

## Description

An n-bit gray code sequence is a sequence of 2ⁿ integers where:

- Every integer is in the inclusive range `[0, 2ⁿ - 1]`.
- The first integer is 0.
- An integer appears no more than once in the sequence.
- The binary representation of every pair of adjacent integers differs by exactly one bit.
- The binary representation of the first and last integers differs by exactly one bit.

Given an integer `n`, return the gray code sequence in the order the examples show: the element at
index `i` (0-indexed) is `i ^ (i >> 1)`, the standard reflected gray code.

### Example 1

```text
Input: n = 2
Output: [0,1,3,2]
Explanation: The binary representation of [0,1,3,2] is [00,01,11,10].
- 00 and 01 differ by one bit
- 01 and 11 differ by one bit
- 11 and 10 differ by one bit
- 10 and 00 differ by one bit
```

### Example 2

```text
Input: n = 1
Output: [0,1]
```

### Constraints

- `1 <= n <= 16`
