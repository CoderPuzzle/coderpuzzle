# Solutions — Best Time to Buy and Sell Stock III

Both solutions turn on the same fact: two sales that never overlap cut the
days into a left half and a right half, so the search is really for the best
place to cut. The split arrays make that literal — tabulate the best single
sale inside every prefix and every suffix, and each cut costs one lookup.
The four-state wealth machine folds the same search into one forward walk
that tracks wealth, not trades, through four states and carries no tables
at all.

## Forward/backward split arrays

Any legal plan slices the days at some boundary: the first sale closes by
it, the second opens at or after it. So tabulate, for every day `i`, the
profit of the best single sale inside `prices[0..i]` — call it
`best_prefix[i]` — and likewise `best_suffix[i]` for `prices[i..n-1]`. The
answer is the maximum of `best_prefix[i] + best_suffix[i]` over all splits.
Each table is one half-line scan: forward, a running minimum buys and each
day's price sells; backward, each day's price buys and a running maximum
sells. Both scans are the one-trade algorithm run from opposite ends.

The boundary's accounting needs care. A first sale ending on day `i` may
share the day with the second purchase — selling and rebuying at one price
is financially the same as holding, so such a plan never beats a strictly
separated one and nothing is overcounted. And because both tables floor at
`0` (a same-day buy-and-sell earns nothing), an unused side of a split is
exactly Hint 3's zero-profit placeholder: plans that trade once — split at
`n-1`, where `best_suffix` is `0` — or not at all fall out without any
transaction count.

On `[1, 4, 2, 6, 3, 8]` the split at day 3 pairs `best_prefix[3] = 5`
(buy 1, sell 6) with `best_suffix[3] = 5` (buy 3, sell 8) for `10`; on the
sagging `[9, 7, 7, 2]` every entry of both tables is `0`. The price of the
decomposition is storage: two full arrays, one per direction.

**Complexity:** `O(n)` time, `O(n)` space.

## State-Machine Dynamic Programming

Describe your wealth after each day with four states: after the first buy (`buy1`), after the first sell (`sell1`), after the second buy (`buy2`), and after the second sell (`sell2`). One forward sweep over the prices updates all four: each state either keeps yesterday's value or transitions today, where buying adds `-price` and selling adds `+price` on top of the preceding state.

The per-day updates read in order: `buy1 = max(buy1, -price)` (the cheapest first buy so far), `sell1 = max(sell1, buy1 + price)`, `buy2 = max(buy2, sell1 - price)`, and `sell2 = max(sell2, buy2 + price)`. Because each state reads the already-updated earlier states, a same-day buy-and-sell is permitted — and that is exactly what lets the machine avoid a separate "transaction count" dimension: a degenerate transaction that buys and sells on the same day contributes zero profit, so it can stand in for "do nothing" without ever inflating the answer. In particular `sell2 >= sell1 >= 0` always holds, so returning `sell2` is correct even for plans that use fewer than two transactions.

The buy states start at -10^9, a sentinel meaning "not yet reachable" (its magnitude exceeds any achievable debt since prices are at most 10^5), while the sell states start at 0, representing never having traded. On a strictly decreasing price list no sell ever improves on 0, so the answer is 0 rather than a forced losing trade.

**Complexity:** `O(n)` time, `O(1)` space.
