# Solutions — Confusing Number

## Digit-by-digit rotation with an implicit reversal

Peel `n` apart from the least significant digit with repeated `% 10` /
`/ 10`, exactly the order a 180-degree rotation puts digits in: the units
digit ends up on the far side once the whole numeral is flipped, so it
becomes the most significant digit of the rotated result, and so on for
every digit above it. Each peeled digit is looked up in the fixed
rotation table (`0->0, 1->1, 6->9, 8->8, 9->6`); any digit outside that
table (2, 3, 4, 5, 7) makes the rotation invalid, so the method returns
`false` immediately.

The rotated value is accumulated with `rotated = rotated * 10 +
rotate[digit]` as each digit is peeled off, which folds the digits into
their new most-significant-first order for free and also drops any
leading zeros the rotation introduces — e.g. rotating `100` walks the
zeros first, keeping the accumulator at `0`, and only the trailing `1`
lands as the final digit, so the rotated value is `1`, not `001`.

Once every digit of `n` has been consumed and shown valid, the number is
confusing exactly when the accumulated rotated value differs from the
original `n`.

**Complexity:** `O(log n)` time, `O(1)` space, where `n` is the input
value.
