# Solutions — Subtract the Product and Sum of Digits of an Integer

## Peel digits with mod and divide

One pass strips `n` into its digits from the right: `n % 10` is the last
digit, integer division by 10 discards it, and the loop repeats until `n`
is zero. The two aggregates — a running product starting at 1 and a
running sum starting at 0 — absorb each digit as it comes off, so the
answer is just product minus sum. No string conversion or digit array is
needed; the number never has to be stored anywhere but in the two
accumulators.

The alternative reads `n` as a decimal string and folds over its
characters. It computes exactly the same two aggregates; the arithmetic
peel avoids the allocation and keeps every step in registers, though at
six digits the difference is unmeasurable.

**Complexity:** `O(d)` time for `d` digits (`d <= 6` at these bounds);
`O(1)` space.
