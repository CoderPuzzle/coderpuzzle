# Solutions — Best Time to Buy and Sell Stock with Transaction Fee

Both sweeps run one pass with a fixed handful of figures — no tables, no
history. The state machine is the general engine: it names the two positions
a trader can occupy and prices every legal move between them, letting the
maximum sort the plans. The greedy is the refined shortcut instead: it folds
the fee into the buy price, banks every rise that clears the threshold on the
spot, and rests its optimality on a local exchange argument rather than an
enumeration of plans.

## State-Machine Dynamic Programming

After processing any day you are in exactly one of two states: `cash`, the best profit while holding no share, or `hold`, the best profit while holding one share. Day to day each state either persists or is improved by a transition out of the other: selling adds `price - fee` to yesterday's `hold`, buying subtracts `price` from yesterday's `cash`. The simultaneous tuple assignment evaluates both right-hand sides against the previous day's values, so the two updates never feed into each other within the same day.

`hold` starts at a sentinel of negative one billion — holding a share before the first day is impossible, so any transition through the sentinel yields a value no real strategy can reach — while `cash` starts at 0, representing doing nothing. The fee is charged exactly once per completed transaction, on the sell leg. Because both states always retain the do-nothing option, an input where the fee makes every trade unprofitable simply leaves the answer at 0; the recurrence never forces a transaction.

Correctness is an induction over the price list: every legal sequence of non-overlapping transactions is a path through these two states, and each state's value is the maximum profit achievable by any such path ending in that state. Ending with a share in hand is never better than having sold, so the final `cash` is the answer.

**Complexity:** `O(n)` time, `O(1)` space.

## Greedy with Fee-Adjusted Effective Buy

Fold the fee into the entry price and the optimal plan assembles itself. The
code carries two figures: `total`, the profit already banked, and `basis`, the
fee-adjusted effective buy — the entry the next sale will be judged against.
`basis` opens beyond every price, so the first day always sets the entry.
Thereafter each day reads one of three ways. A price above `basis + fee`
clears a whole round trip: the surplus `price - basis - fee` is banked at once
and the basis re-anchors at `price - fee`, handing the fee just charged back
as a discount on the next entry. A price below `basis` is a strictly cheaper
entry and replaces it for free. A price in between is noise — too low to
clear the fee, too high to improve the entry — and the day passes without
action.

The rebate is what makes banking early safe. After banking at `p` the basis
sits at `p - fee`; if the price then climbs to `q`, the next banking adds
`q - (p - fee) - fee = q - p`, and the two together total `q - b - fee` — one
uninterrupted trade from the original entry `b`, charged a single fee.
Selling and immediately re-buying at the same price would normally burn a
second fee; the rebate waives it, so slicing a long rise into successive
bankings costs nothing against holding straight through.

Read as a whole, the ledger is itself a legal plan: between two dips the
bankings compose into one trade charged a single fee, and every dip opens the
next trade only after the previous one has closed, so the banked total is
achievable. That it cannot be beaten is the exchange: a purchase can always
be slid down to the running minimum since the last sale — which is precisely
what `basis` holds — and a sale that clears `basis + fee` can be cut at any
intermediate rise without disturbing the composed total, since the rebate
makes the cut free. An optimal plan pushed through these exchanges lands on
the ledger with its profit intact, so the banked total is the optimum. And
because only banked profit counts — nothing is left at risk in an open
position — a fee that swallows every gap simply leaves `total` at `0`.

**Complexity:** `O(n)` time, `O(1)` space.
