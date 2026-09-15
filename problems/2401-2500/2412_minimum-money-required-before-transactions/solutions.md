# Solutions — Minimum Money Required Before Transactions

## Worst-case peak formula

Split the transactions into losing ones (`cashback < cost`), which permanently drain money, and winning ones, which do not. The total drain of the losing block is fixed no matter the order: `total_lose = sum(cost - cashback)` over losers. The worst ordering puts all losers first, and among them the one with the largest cashback last. At that final loser you must have already absorbed every other loser's drain and still hold its full cost, which works out to a required start of `total_lose + max(cashback over losers)`.

Winning transactions never reduce total money, so their placement only matters through the single largest upfront cost they demand: inserting the most expensive winner at the point of lowest funds — right after the losing block, when exactly `total_lose` has been lost — requires `total_lose + max(cost over winners)`. Doing the winners first can only be easier, and interleaving them among the losers never lowers the peak below the losing-block requirement. Hence the answer is `total_lose + max(max cashback among losers, max cost among winners)`, and a straightforward exchange argument shows no ordering of any transaction sequence forces a higher starting amount than this.

The whole computation is one linear pass accumulating three aggregates — the total loss, the largest losing cashback, and the largest winning cost — with no sorting and no simulation of orderings. A list containing only winners or only losers simply leaves one of the two maxima at 0.

**Complexity:** `O(n)` time, `O(1)` space.
