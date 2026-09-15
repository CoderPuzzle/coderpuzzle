# Solutions — Water Bottles

## Simulate the exchange rounds

Every bottle gets drunk exactly once, whether it started full or was
obtained by trading in empties, so the running total of bottles drunk is
just `numBottles` plus however many extra full bottles the empties buy
over the course of the process. Track the count of `empty` bottles
separately from the running `drunk` total: initialize both from
`numBottles`, then repeatedly trade in as many groups of `numExchange`
empties as the current supply allows.

Each round converts `empty // numExchange` empties into that many new
full bottles, which are immediately drunk and become empty again — so the
new `empty` count is the leftover remainder plus the bottles just
produced. The loop stops once `empty` drops below `numExchange`, because
no further trade is possible; whatever remains there is stranded for good.
Because `numExchange >= 2`, `empty` strictly shrinks or holds only a
bounded number of leftover bottles each round, so the loop always
terminates, and for the given bounds (`numBottles, numExchange <= 100`)
it runs only a handful of times.

**Complexity:** `O(numBottles)` time, `O(1)` space.
