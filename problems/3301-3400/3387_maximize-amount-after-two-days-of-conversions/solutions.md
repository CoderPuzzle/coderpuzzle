# Solutions — Maximize Amount After Two Days of Conversions

Day 1 must end holding some currency `c` and day 2 must convert `c` back to
`initialCurrency`, so the answer splits over the choice of `c`: maximize the
amount of `c` reachable on day 1, then maximize what that amount becomes
after returning to `initialCurrency` on day 2. Each half is an
all-pairs conversion-rate question inside one day's graph, which the
statement's consistency guarantee makes well-defined: every cycle has
product exactly 1, so all paths between two currencies carry the same rate.

## BFS amounts from every day-1 endpoint

Run one BFS from `initialCurrency` over day 1, where a forward pair
multiplies the carried amount by its rate and a reverse pair divides by it.
Because rates are consistent, the first visit to a currency already carries
its maximum amount. Then rerun that same BFS once per currency reached on
day 1, starting from the amount day 1 left there, and read the amount the
search records for `initialCurrency` — the search's starting currency when
day 1 changed nothing, which keeps the answer at or above 1.0. The largest
value over those searches is the answer.

The graph has at most `2(n+m)+1` currencies and `2(n+m)` edges, so the
`n+m+1` searches cost well under `10⁴` arithmetic steps. Every amount is a
short chain of multiplications and divisions of the given rates, evaluated
in a fixed order, and IEEE-754 arithmetic is deterministic — every language
here performs the identical sequence and produces bit-identical amounts,
which is what the judge's exact comparison relies on.

**Complexity:** `O((n+m)²)` time, `O(n+m)` space.
