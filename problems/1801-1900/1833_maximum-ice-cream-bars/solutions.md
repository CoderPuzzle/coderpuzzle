# Solutions — Maximum Ice Cream Bars

To maximize the count of bars bought, every coin must buy as much "bar
count" as it can, which means the cheapest bars are always the best deal:
swapping any bar in the basket for a cheaper one left outside never
decreases the count. So an optimal basket is the cheapest prefix of the
sorted price list, and the answer is how far that prefix goes before the
budget runs out.

## Counting sort, then a cheapest-first sweep

The statement pins counting sort, and the value range makes it natural:
prices live in `1..10⁵`, so tally `count[p]` for each price `p`, then walk
`p` upward from 1. At each price, buy as many of its bars as possible —
the whole tally, or as many as the remaining budget covers,
`min(count[p], coins / p)` — deduct their cost, and keep walking. When the
remaining budget drops below the next price, nothing later can be
afforded (prices only increase), so the walk can stop early.

The arithmetic stays comfortably exact everywhere: individual prices are
at most `10⁵` and the budget at most `10⁸`, both inside 32 bits; even the
worst deduction `afford * price` is capped by the budget itself. The two
passes touch each input once (`O(n + max_price)`) and the tally is fixed
size (`O(max_price)` space), which beats comparison sorting's `n log n`
and is exactly why the problem prescribes it.

**Complexity:** `O(n + C)` time, `O(C)` space, where `n` is the number of
bars and `C = 100000` the price ceiling.
