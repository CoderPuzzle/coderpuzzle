# Solutions — Compare Version Numbers

## Two pointers, read each revision as a number

Two pointers walk the version strings side by side. Each step reads the run of digits
starting at the two pointers — up to the next dot, or the end of the string — and folds
it into a number, `value = value * 10 + digit`. Accumulating instead of comparing
digit-text is the whole trick: leading zeros add nothing, so `"01"` and `"001"` both
fold to `1`, while a straight string comparison of `"9"` and `"10"` would rank them
backwards.

Once both revisions are numbers, one integer comparison decides the answer — `-1` or `1`
— and only equal revisions let the pointers move on, stepping past their dots. A string
that runs out keeps feeding zeros: its inner read loop finds no digits, the value stays
`0`, and the outer loop keeps pairing it against the other string's remaining revisions,
exactly the "missing revisions count as 0" rule. When both pointers are spent the
versions are equal and `0` is returned.

Each digit of each string is visited exactly once and nothing is copied or reallocated —
the revisions are consumed where they sit, so no split list is ever materialized. The
fold runs in a 64-bit integer so even a revision past the 32-bit range parses exactly.

**Complexity:** `O(n + m)` time, `O(1)` space.
