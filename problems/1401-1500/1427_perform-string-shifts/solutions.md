# Solutions — Perform String Shifts

## Net the rotations, apply one

Every shift is a rotation, and rotations of the same string compose: a
left shift by `a` cancels a right shift by `a`, and any sequence of them
equals the single rotation by the algebraic sum — left counted positive,
right negative. So the first step folds the whole matrix into one number
`net = sum(amount)` for left minus `sum(amount)` for right, which can be
negative.

That number is then normalized into the range `[0, n)` with a modulo —
Python's `%` already yields a non-negative result, and the other
languages adjust by adding `n` before taking the modulus. A positive net
left shift of `k` moves the first `k` characters to the end, so the
answer is `s[k:] + s[:k]`; a net right shift of `r` is the same thing
viewed from the left with `k = n - r`, which is exactly what the
normalized modulo produces.

With at most 100 operations the literal simulation would also pass, but
the netting version does one slice instead of up to a hundred, and the
arithmetic can never overflow since the totals stay under `2 · 10⁴`.

**Complexity:** `O(n + m)` time for the sum and one slice (`m` shift
rows), `O(n)` space for the result.
