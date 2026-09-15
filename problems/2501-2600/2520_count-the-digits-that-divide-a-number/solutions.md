# Solutions — Count the Digits That Divide a Number

## Digit peeling with mod-10 extraction

The test itself is one line — `num % d == 0` decides whether digit `d`
divides `num` — so the whole problem is extracting digits. Taking the
value modulo 10 yields the least significant digit, and an integer
division by 10 shifts the next digit into that position, repeating
until the value is exhausted. Each extracted digit is checked against
the untouched original, because the comparisons must all be made
against the same full number, not the shrinking remainder.

Digits are counted with multiplicity: a digit appearing several times
contributes once per occurrence, exactly as example 2 shows for the two
1s in 121. The constraints promise no zero digit anywhere in num, which
is what makes every division safe without a special case.

At most nine digits exist (num ≤ 10⁹), so the loop runs at most nine
times regardless of input; everything involved fits trivially in any
language's exact integer range.

**Complexity:** `O(log₁₀ num)` time, `O(1)` space.
