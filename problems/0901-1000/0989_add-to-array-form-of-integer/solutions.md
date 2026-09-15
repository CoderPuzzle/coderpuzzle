# Solutions — Add to Array-Form of Integer

The tempting shortcut — collapse `num` into an integer, add `k`, stretch the
sum back out into digits — is dead on arrival: `num` carries up to 10⁴
digits, and no fixed-width integer in these languages holds a number with
ten thousand digits. Schoolbook addition never needs the whole number at
once, though: it consumes one digit at a time with a single running carry,
which is exactly the shape the array-form already has.

## Schoolbook addition with k as the carry

Walk `num` from its last digit to its first, carrying a running value
seeded with `k` itself. At each digit the carry absorbs it, emits the last
digit of the sum, and keeps the rest: `carry += digit`, emit `carry % 10`,
then `carry //= 10`. When `num` runs out, whatever of `k` has not yet been
consumed flows out through the same emit-and-divide loop, at most five more
digits since `k <= 10⁴`. Digits come out least-significant first, so the
collected list is reversed before it is returned.

Seeding the carry with `k` is what lets one loop serve both operands: `k` is
spent from its last digit inward exactly as `num` is, and once `k`'s digits
are gone the carry is a single digit that either ripples through a tail of
9s or dies at the first digit that is not 9. Every intermediate value stays
at or below `k + 9 <= 10009`, far inside 32-bit range, which keeps this
digit-wise shape correct in the fixed-width languages. The result has at
most `max(len(num), 5) + 1` digits and never a leading zero — the trailing
emit loop runs only while the carry is nonzero, and `num = [0]`, the zero
itself, simply yields `k`'s digits.

**Complexity:** `O(max(n, log k))` time, `O(max(n, log k))` space (output).
