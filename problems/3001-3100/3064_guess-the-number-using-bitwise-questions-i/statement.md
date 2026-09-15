# Guess the Number Using Bitwise Questions I

## Description

This is an **interactive** problem.

There is a number `n` that you have to find.

There is also a pre-defined API `int commonSetBits(int num)`, which returns
the number of bits where both `n` and `num` are 1 in that position of their
binary representation. In other words, it returns the number of set bits in
`n & num`, where `&` is the bitwise AND operator.

Return the number `n`.

**Note (CoderPuzzle):** the signature is `findNumber(hiddenNumber)`; the API
arrives as the `HiddenNumber` object handed to your method — call
`hiddenNumber.commonSetBits(num)` to query it.

### Example 1

```text
Input: n = 31
Output: 31
Explanation: It can be proven that it's possible to find 31 using the
provided API.
```

### Example 2

```text
Input: n = 33
Output: 33
Explanation: It can be proven that it's possible to find 33 using the
provided API.
```

### Constraints

- `1 <= n <= 2³⁰ - 1`
- `0 <= num <= 2³⁰ - 1`
- If you ask for some `num` out of the given range, the output wouldn't
  be reliable.

## Hints

### Hint 1

Ask `2ⁱ` for `0 <= i < 30`.

### Hint 2

If the result is greater than zero for some `i`, this bit is a set bit in
`n`.
