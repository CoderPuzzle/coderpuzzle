# Find Kth Bit in Nth Binary String

## Description

A family of binary strings is built recursively. The first string is

```text
S(1) = "0"
```

and every later string extends the previous one:

```text
S(i) = S(i-1) + "1" + reverse(invert(S(i-1)))    for i > 1
```

Here `+` is concatenation, `reverse(x)` reverses the string `x`, and
`invert(x)` flips every bit of `x` (each `0` becomes `1` and each `1`
becomes `0`).

For example, the first four strings in the family are:

```text
S(1) = "0"
S(2) = "011"
S(3) = "0111001"
S(4) = "011100110110001"
```

Given two positive integers `n` and `k`, return the `k`-th bit (1-indexed)
of `S(n)`, as a one-character string. It is guaranteed that `k` is within
the length of `S(n)`.

### Example 1

```text
Input: n = 3, k = 1
Output: "0"
Explanation: S(3) is "0111001". The 1st bit is "0".
```

### Example 2

```text
Input: n = 4, k = 11
Output: "1"
Explanation: S(4) is "011100110110001". The 11th bit is "1".
```

### Constraints

- `1 <= n <= 20`
- `1 <= k <= 2ⁿ - 1`

## Hints

### Hint 1

`n` is small enough that simply simulating the construction of `S(1)`
through `S(n)` is one valid way to find the answer.
