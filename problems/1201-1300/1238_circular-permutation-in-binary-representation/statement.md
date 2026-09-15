# Circular Permutation in Binary Representation

## Description

Given 2 integers `n` and `start`, return the permutation `p` of
`(0, 1, 2, ..., 2^n - 1)` in the canonical order this problem fixes: the
element at index `i` is `p[i] = start ^ (i ^ (i >> 1))` — the standard
reflected gray code, translated by `start`.

That sequence satisfies every requirement of the task:

- `p[0] = start`
- `p[i]` and `p[i+1]` differ by only one bit in their binary representation.
- `p[0]` and `p[2^n - 1]` also differ by only one bit in their binary
  representation.

### Example 1

```text
Input: n = 2, start = 3
Output: [3,2,0,1]
Explanation: The binary representation of the permutation is (11,10,00,01).
All the adjacent elements differ by one bit.
```

### Example 2

```text
Input: n = 3, start = 2
Output: [2,3,1,0,4,5,7,6]
Explanation: The binary representation of the permutation is (010,011,001,000,100,101,111,110).
Every pair of adjacent elements differs by one bit, and so do the first and last.
```

### Constraints

- `1 <= n <= 16`
- `0 <= start < 2^n`

## Hints

### Hint 1

Use gray code to generate an n-bit sequence.

### Hint 2

Translate the sequence by `start` so that its first element is `start`.
