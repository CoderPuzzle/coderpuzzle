# Solutions — Solve the Equation

## Reduce each side to a·x + b, then solve the linear equation

The string is one linear equation in one unknown, so the whole task is a
reduction: split at the single `'='`, then scan each side once, folding every
term into a coefficient sum `a` and a constant sum `b`. A term is an optional
sign, a run of digits, and a possible trailing `'x'`; the grammar's only trap
is the omitted coefficient — a bare `'x'` means `1·x` and `'-x'` means `-1·x`,
while the digits before an `'x'` are its multiplier. A `'0x'` term is legal
and simply contributes nothing, and the first term may open with a `'-'`, so
the scan reads the sign before every term rather than only between terms.

Moving everything to one side turns `la·x + lb = ra·x + rb` into
`(la - ra)·x = rb - lb`, and a linear equation `a·x = b` has exactly three
outcomes. When `a` is zero the variable has vanished: `b == 0` is an identity
true for every `x` — `"Infinite solutions"` — while any other `b` is a flat
contradiction — `"No solution"`. Otherwise `x = b/a`, which the statement
guarantees is an integer, so integer division is exact and the rendering is
just `"x=" + value`: a plain signed decimal, no `'+'` separator, and no
negative-zero wrinkle because zero divided by anything is exactly `0`.

The accumulators never strain the machine: at most a thousand characters fit
roughly 250 terms, each contributing at most 100, so both sides' sums stay
under 25 000 — far inside every language's integers, with no overflow
special-casing anywhere.

**Complexity:** `O(n)` time in the equation's length — each character is
visited exactly once — and `O(1)` space beyond the two side strings.
