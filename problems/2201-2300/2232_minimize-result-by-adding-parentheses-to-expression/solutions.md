# Solutions — Minimize Result by Adding Parentheses to Expression

## Enumerate every parenthesis placement as a × (b + c) × d

The left parenthesis splits `<num1>` into an outer multiplier `a` (the digits
before it, or 1 when it sits at the front) and the inner addend `b` (the
rest); the right parenthesis splits `<num2>` into the inner addend `c` and
an outer multiplier `d` (the trailing digits, or 1 when it sits at the end).
Every legal placement is therefore exactly `a * (b + c) * d`, and with at
most 5 digits per side there are at most 25 placements — small enough to
evaluate all of them and keep the smallest, rebuilding the parenthesized
string for the winner.

Ties are permitted ("return any of them"), so a strict less-than while
scanning placements left-to-right deterministically pins one minimal form.
Values fit in signed 32-bit by the statement's guarantee; the scan computes
through the 64-bit width anyway so intermediate products never wrap.

**Complexity:** `O(len(expression)²)` evaluations with tiny constants,
`O(len(expression))` space.
