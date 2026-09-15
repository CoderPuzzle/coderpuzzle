# Minimum One Bit Operations to Make Integers Zero

## Description

You are given an integer `n`. You must transform it into `0` using any
number of the following two operations:

- Change the rightmost (0th) bit in the binary representation of `n`.
- Change the `i`-th bit in the binary representation of `n` (for `i > 0`)
  if the `(i-1)`-th bit is set to `1` and the `(i-2)`-th through `0`-th
  bits are all set to `0`.

Return the minimum number of operations needed to transform `n` into `0`.

### Example 1

```text
Input: n = 3
Output: 2
Explanation: The binary representation of 3 is "11".
"11" -> "01" with the 2nd operation since the 0th bit is 1.
"01" -> "00" with the 1st operation.
```

### Example 2

```text
Input: n = 6
Output: 4
Explanation: The binary representation of 6 is "110".
"110" -> "010" with the 2nd operation since the 1st bit is 1 and the 0th
bit is 0.
"010" -> "011" with the 1st operation.
"011" -> "001" with the 2nd operation since the 0th bit is 1.
"001" -> "000" with the 1st operation.
```

### Constraints

- `0 <= n <= 10⁹`

## Hints

### Hint 1

The fastest way to convert `n` to zero is to remove all set bits starting
from the leftmost one. Try some simple examples to learn the rule for how
many steps are needed to remove one set bit.

### Hint 2

Consider the `n = 2^k` case first, then solve for all `n`.
