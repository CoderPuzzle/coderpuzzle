# Solutions — Least Operators to Express Number

Between the additions and subtractions, every maximal run of multiplications
and divisions collapses to a single power of `x`, so an expression is a signed
sum of such powers — and the cheapest way to pay for `target` reads it in base
`x`, choosing at each place between adding that many copies and subtracting
just enough to carry one unit upward.

## Charge each base-x digit its cheaper side

A copy of the `i`-th power costs `i - 1` operators to build — `x * x * ... * x`
— plus one `+` or `-` to attach it, and a copy of `1 = x / x` costs the
division plus the attach; so one copy at the units place is charged 2 operators
and one copy at the `i`-th place above it is charged `i`. Subtraction makes the
sign free: a base-`x` digit `d` is paid either `d` copies at its own place, or
`x - d` copies subtracted there while a single unit carries into the next place
up — as with 19 at `x = 3`, where `2 * 9 + 1` and `27 - 9 + 3 / 3` are both on
the table and the first wins with 5 operators.

Sweeping the digits from the least significant end, only the pending carry —
0 or 1 — connects one place to the next, so two running totals suffice: the
best cost ending with no carry and the best ending with one. Each digit updates
both from both, a carry still alive above the top digit pays for a single copy
one place higher, and since the very first copy of the whole expression needs
no attaching operator, one operator is deducted from the total at the end.

At the bound `x = 100`, `target = 2 * 10⁸` the answer itself stays in the low
hundreds and the running totals far below any fixed-width limit; the sentinel
that marks the carry state unreachable before the first digit is what makes the
fixed-width solutions carry the two totals in 64-bit integers. Python's
integers are unbounded, and the JavaScript and TypeScript arithmetic stays
exact far below `2⁵³`.

**Complexity:** `O(log_x target)` time, `O(1)` space.
