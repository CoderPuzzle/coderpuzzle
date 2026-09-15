# Solutions — Smallest String With A Given Numeric Value

Every letter is a budget choice: each of the `n` positions contributes a value
between 1 and 26, the contributions must sum to `k`, and dictionary order
rewards spending as little as possible as early as possible. The whole task is
deciding where the surplus above the all-`a` floor goes — and lex order pins
it as far right as the per-letter cap allows.

## Spend from the end

First observe what the answer must look like. If a feasible string ever has a
letter followed by a smaller one, swapping the two keeps the length and the
numeric value while making the string lexicographically smaller — so the
smallest string is non-decreasing. And a sorted string cannot hold two middle
letters `u <= v` strictly between `a` and `z`: shifting one unit from `u` to
`v` keeps it sorted and feasible yet lexicographically smaller. So the answer
is a block of `a`'s, then at most one letter, then a block of `z`'s — exactly
the shape of `"aay"` and `"aaszz"`.

The code materializes that shape by filling positions from the last to the
first. At a position with `i` still-open slots before it and `remaining` units
of budget, every completion must leave at least `i` units for those slots —
one per letter — so the largest value this position may take is
`min(26, remaining - i)`. Taking it is safe: what stays, `remaining - value`,
still lies between `i` (all `a`'s) and `26 * i` (all `z`'s), so the prefix
remains fillable. While the budget is heavy the cap binds and the position is
a `z`; the first time it does not, the position takes exactly
`remaining - i`, the reserve falls to precisely the open-slot count, and every
earlier position is forced to `a` — the run-block shape above.

Optimality is the same statement read from the front: any unit this late
position refuses must be spent at some earlier, lexicographically heavier
position, which can only enlarge a letter the dictionary compares first. So
spending the maximum late, position by position from the back, leaves every
prefix as small as it can be — one pass, no search, one letter decided per
iteration.

**Complexity:** `O(n)` time, `O(n)` space (output).
