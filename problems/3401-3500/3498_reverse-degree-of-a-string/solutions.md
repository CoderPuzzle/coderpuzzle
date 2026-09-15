# Solutions — Reverse Degree of a String

## Reverse-alphabet weighted sum

The reverse degree is a single weighted sum: every character contributes its
position in the reversed alphabet (`'a'` → 26 down to `'z'` → 1) multiplied
by its 1-indexed position in the string. Both factors are linear in the
character's byte value and its index, so the whole answer falls out of one
pass over the input with no auxiliary structure.

For a lowercase letter `c`, the reversed-alphabet value is `26 - (c - 'a')`:
the letter rank `c - 'a'` runs 0..25, and reversing the alphabet is exactly
a reflection around the middle. The code walks the string with `enumerate`,
computes that value with a single subtraction, scales it by the 1-indexed
position `index + 1`, and accumulates into `total`. Nothing is mutated and no
preprocessing is needed.

Because `s.length <= 1000`, the largest possible term is `26 * 1000` and the
sum stays comfortably inside a 32-bit integer — the `int` accumulator in
every language is safe without widening.

**Complexity:** `O(n)` time, `O(1)` space.
