# Split Array into Fibonacci Sequence

## Description

You are given a string of digits `num`, such as `"123456579"`. The task is to
cut it into consecutive pieces that read as a Fibonacci-like sequence — here,
`[123, 456, 579]`, because 123 + 456 = 579.

Formally, a Fibonacci-like sequence is a list `f` of non-negative integers
such that:

- `0 <= f[i] < 2³¹` (each integer fits in a 32-bit signed integer type),
- `f.length >= 3`, and
- `f[i] + f[i + 1] == f[i + 2]` for all `0 <= i < f.length - 2`.

A piece of the split must not carry extra leading zeroes: the only piece that
may begin with `0` is the number `0` written on its own.

Several splits of the same string can be Fibonacci-like. To make the answer
unique, the required split is the first one reached by trying first pieces
from shortest to longest and, under each first piece, second pieces from
shortest to longest — after two pieces nothing is free anymore, since every
later term is the sum of the two terms before it. Return the first split
under this order that consumes the entire string, or `[]` when no valid
split exists.

### Example 1

```text
Input: num = "1101111"
Output: [11,0,11,11]
Explanation: No second piece carries a first piece "1" across, so the
shortest first piece that works is "11", followed by "0": 11 + 0 = 11 and
0 + 11 = 11. The split [110,1,111] is also Fibonacci-like, but its first
piece is longer, so the shortest-first order never reaches it.
```

### Example 2

```text
Input: num = "112358130"
Output: []
Explanation: The promising run 1, 1, 2, 3, 5, 8, 13 dies at the trailing
0 — no choice of first two pieces extends across the whole string.
```

### Example 3

```text
Input: num = "0123"
Output: []
Explanation: A piece may not carry a leading zero, so the first piece must
be "0" on its own — and no second piece lets the forced run reach the end.
```

### Constraints

- `1 <= num.length <= 200`
- `num` contains only digits.
