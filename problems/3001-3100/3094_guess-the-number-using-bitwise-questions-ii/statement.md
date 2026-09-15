# Guess the Number Using Bitwise Questions II

## Description

There is a number `n` between 0 and 2³⁰ - 1 (both inclusive) that you have
to find.

There is a pre-defined API `int commonBits(int num)` that helps you with
your mission. But here is the challenge, every time you call this function,
`n` changes in some way. But keep in mind, that you have to find the initial
value of `n`.

`commonBits(int num)` acts as follows:

- Calculate count which is the number of bits where both `n` and `num` have
  the same value in that position of their binary representation.
- `n = n XOR num`.
- Return count.

Return the number `n`.

Note: In this world, all numbers are between 0 and 2³⁰ - 1 (both inclusive),
thus for counting common bits, we see only the first 30 bits of those
numbers.

**Note (CoderPuzzle):** the signature is `findNumber(commonBits)`; the API
arrives as the `CommonBits` object handed to your method — call
`commonBits.commonBits(num)` to query it.

### Example 1

```text
Input: n = 2
Output: 2
Explanation:
The hidden number starts as binary ...00010. Calling commonBits(0) returns
29 — a 30-bit window holding one set bit leaves 29 zeros, and the state is
unchanged because num is 0. Probing num = 1 returns 28 (< base, so bit 0 is
clear), and probing it again restores the state. Probing num = 2 then
returns 30 (> base), so bit 1 is set, and asking again flips it back. Every
remaining probe answers 28. Assembling the marked bits gives 2.
```

### Example 2

```text
Input: n = 3
Output: 3
Explanation:
Calling commonBits(0) returns 28 — two set bits leave 28 zeros. Probing
num = 1 returns 29 (> base) and re-probing restores the number; probing
num = 2 also returns 29 (> base). Bits 0 and 1 are both set, so the hidden
number is 3.
```

### Constraints

- `0 <= n <= 2³⁰ - 1`
- `0 <= num <= 2³⁰ - 1`
- If you ask for some num out of the given range, the output wouldn't be
  reliable.

## Hints

### Hint 1

Ask the number 0 and save the result in base.

### Hint 2

Ask 2ⁱ for i = 0 to 29.

### Hint 3

If the result is greater than base for some i, then this bit is a set bit in n.

### Hint 4

What can be done to revert the effect of the XOR.

### Hint 5

Doing XOR again with the same number reverts the effect.
