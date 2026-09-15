# Solutions — Maximum Value after Insertion

Comparing all `len(n) + 1` insertion candidates numerically is quadratic
in the string length once big-integer parsing is involved. Greedy
reasoning removes the comparison entirely: the first position where
inserting `x` strictly helps is globally best, because every earlier
digit keeps its higher place value.

## First-improvement greedy scan

For a positive (or non-signed) `n`, scan left to right and insert `x`
immediately before the first digit smaller than `x`; if none exists,
append at the end. For a negative `n` the sign of improvement flips —
making the number smaller in absolute value helps — so insert before the
first digit greater than `x`, again appending if no such digit appears.
The digit after an insertion point can never be recovered by waiting: on
the positive side, placing `x` later only hands a strictly larger
replacement digit to a more significant position, which lowers the
value.

The result is built with one substring splice; nothing but the scan and
the output string are needed.

**Complexity:** `O(n)` time for a string of length `n`, `O(n)` space for
the output.
