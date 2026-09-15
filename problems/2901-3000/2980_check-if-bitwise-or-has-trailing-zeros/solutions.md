# Solutions — Check if Bitwise OR Has Trailing Zeros

## Count the even elements

Trailing zeros live at the least significant end: a number's binary
representation ends in 0 exactly when the number is even. OR never unsets
a bit, so the OR of a selection ends in 0 precisely when every selected
element ends in 0 — the least significant bit of each operand must
already be 0, and OR preserves it. The question "is there a selection of
two or more elements whose OR has a trailing zero" therefore reduces to
"are there at least two even elements".

One pass over `nums` counts the even values and returns whether the count
reaches two. The early exit is optional on inputs this small (at most 100
elements), so the loop simply finishes and compares the count. Nothing
but the parity test touches the values, so no bit width is ever at risk.

**Complexity:** `O(n)` time, `O(1)` space.
