# Solutions — Lemonade Change

## Count the drawers, spend the big bill first

Only two counts ever matter: how many $5 bills and how many $10 bills are in
the drawer. A customer paying $5 needs no change; a customer paying $10
consumes exactly one $5; a customer paying $20 needs $15 back, which is either
one $10 plus one $5 or three $5s. A received $20 can never be given out again,
since $20 exceeds every change amount, so the answer depends on nothing but
those two counters as the queue is scanned once, failing the moment a required
payment is impossible.

The one genuine choice is which combination to hand to a $20-payer, and the
greedy — spend a $10 whenever you can — is provably safe. A $10 in the drawer
is useful only as part of a future $20's change, while a $5 serves every
future customer: both the $10-payers and the $20-payers. Trading one $10 plus
one $5 for three $5s therefore leaves the drawer no worse off by any measure
that future service depends on, so the choice that keeps the most $5s never
turns a servable queue into a failed one. The counterexample runs the other
way: on `[5,5,5,5,10,20,10]`, hoarding the $10 and spending three $5s strands
the final $10-payer with an empty $5 drawer, while the greedy serves everyone.

Every customer is handled with a constant number of counter updates, and the
two counters stay far inside native integer range — at most `n` fives for
`n <= 10⁵` customers — so no language needs a wider type.

**Complexity:** `O(n)` time, `O(1)` space.
