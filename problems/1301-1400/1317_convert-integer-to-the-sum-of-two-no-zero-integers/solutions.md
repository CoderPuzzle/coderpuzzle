# Convert Integer to the Sum of Two No-Zero Integers

## Approach: Scan a upward, testing digits arithmetically

Try `a = 1, 2, 3, ...` and take the first `a` for which both `a` and
`n - a` contain no zero digit; that pair is the canonical (smallest-`a`)
decomposition. Zero-detection is done arithmetically — repeatedly take the
value modulo 10 and divide by 10 — so no string conversion is needed; a
zero remainder anywhere disqualifies the value, and 0 itself (all digits
zero) is rejected on the first iteration.

A valid pair always exists in the constraint range: with `n ≤ 10⁴`, small
`a` values like 1, 2, ..., 12 whose complement `n - a` avoids zero digits
are found within a few iterations (the worst case in `[2, 10⁴]` needs
`a ≤ 112`).

**Complexity:** O(n · d) worst case with d ≤ 5 digits per test; O(1) space.
