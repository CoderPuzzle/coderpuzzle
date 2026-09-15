# Solutions — Water Bottles II

## Greedy bulk-drinking simulation

Two properties collapse the scheduling problem into a simple simulation.
First, drinking is never harmful to do as early as possible: a full bottle
drunk adds one to both the count we are maximizing and the stock of empties
that can pay for future bottles, so holding full bottles in reserve earns
nothing while exchange prices march upward. Second, because each performed
exchange raises `numExchange`, there is never a reason to buy an expensive
batch before exhausting cheaper ones — the cumulative cost `numExchange +
(numExchange + 1) + …` grows with every purchase.

The simulation therefore loops in rounds: drink every full bottle currently
held (adding them to `drunk` and to `empty`), then attempt exactly one
exchange at the current tier — payable only when `empty >= numExchange`,
converting one emptied tier's worth into a single fresh bottle whose turn
to be drunk comes in the next round. The loop naturally ends when the last
round's empties cannot afford the current price, leaving nothing full and
nothing profitable left to trade.

Bounds stay tiny throughout constraints: at most about a hundred drinks
plus roughly fifteen successive tiers, and totals like `drunk <= ~215` fit
any integer type including JavaScript's exact window. The number of loop
iterations equals the number of successful exchanges, which the rising
prices cap at `O(√numBottles)` since the tiers sum to at most the bottles
consumed.

**Complexity:** `O(√numBottles)` time, `O(1)` space.
