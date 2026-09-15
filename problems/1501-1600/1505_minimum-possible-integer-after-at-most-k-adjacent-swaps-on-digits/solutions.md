# Solutions — Minimum Possible Integer After at Most K Adjacent Swaps On Digits

## Greedy digit selection with a Fenwick tree

Building the answer left to right, the best choice for each output position is
the smallest digit that can still be dragged there without spending more than
the remaining swap budget. Moving the digit at some original index to the
front of the not-yet-placed suffix costs exactly one adjacent swap per
not-yet-placed digit that currently sits before it — so for each candidate
digit `0`–`9`, the solution keeps a queue of its remaining original positions
(smallest first, since the earliest occurrence is always the cheapest to
reach) and asks: how many still-active digits precede this position? The
first digit (in increasing value) whose cost fits the remaining budget is
appended, its cost is deducted from `k`, and that position is retired.

Counting "still-active digits before position `p`" and retiring a position
are both prefix-sum operations, so a Fenwick tree (binary indexed tree)
initialized to all ones over the string's length answers each query and
update in `O(log n)`. Each of the `n` output positions tries at most 10
candidate digits, each doing one query and (on success) one update, so the
whole pass is `O(n log n)`. Because a digit is only skipped in favor of the
next larger one when its cost genuinely exceeds the remaining budget, and the
retired position is removed before any later query, the greedy choice at each
step is always correct and the budget bookkeeping stays exact throughout.

**Complexity:** `O(n log n)` time, `O(n)` space.
