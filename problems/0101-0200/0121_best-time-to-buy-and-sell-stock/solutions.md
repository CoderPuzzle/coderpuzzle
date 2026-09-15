# Solutions — Best Time to Buy and Sell Stock

Two ways past the all-pairs search. Both observe that a trade is fixed by one
fact about each of its ends — the cheapest price up to the buy, the dearest
price from the sell — and that both facts are one-sweep computations. The
split method keeps the two ends apart — a backward pass tabulates the best
sale price still to come from every day, a forward pass carries the cheapest
price already passed, and every trade is priced at the seam between its
purchase side and its sale side. The one-pass sweep folds them into a single
left-to-right pass instead: carry the running minimum and let each day offer
one candidate.

## Prefix Minimum, Suffix Maximum

A trade is two days, and the day between them is enough to name it. Fix a
seam `i`: any purchase on or before `i` pairs legally with any sale strictly
after it, because the two sides of the seam cannot collide. The best trade
crossing that seam buys the prefix's cheapest price and sells the suffix's
dearest, and scoring that pair at every seam misses nothing — a trade bought
on day `b` is scored at `i = b`, where the prefix minimum is at most its
purchase price and the suffix maximum at least its sale price.

The suffix half is tabulated by one backward pass: `best_sale[i]` is the
larger of `prices[i]` and `best_sale[i + 1]`, seeded from the last day. The
prefix half needs no table — the forward pass carries `cheapest` through day
`i` and scores `best_sale[i + 1] - cheapest`, keeping the largest. `best` is
seeded at `0`, the profit of standing aside, so a list that never rises, or a
one-day list whose forward loop is empty because no strictly later day
exists, returns 0 without special handling.

Walk `[6, 2, 7, 1, 5]`: the backward pass writes best-sale-from-here as
`[7, 7, 7, 5, 5]`; the seams then score 6 against 7, 2 against 7, 2 against
5 and 1 against 5, and the largest candidate, 5, is buy at 2, sell at 7 — the
same answer the running minimum finds.

The extra table is the whole difference in cost: the future is written down
once so the forward pass can consult it, where the one-pass sweep gets by
asking each day only about the past.

**Complexity:** `O(n)` time, `O(n)` space.

## One-Pass Minimum Tracking

The key observation is that the best profit achievable by selling on a given day is that day's price minus the cheapest price seen on any day at or before it. So instead of testing every buy/sell pair, a single left-to-right sweep can carry the running minimum price and, on each day, consider exactly one candidate: sell today against the cheapest buy so far.

The code maintains `min_price`, seeded with the first price, and `best`, seeded with 0 — the profit of never trading. For each price it first checks whether the price is a new minimum and updates `min_price`; otherwise it compares `price - min_price` against `best` and keeps the larger. The `elif` structure is safe because when a price is a new minimum, `price - min_price` is non-positive and can never beat `best`, which only ever holds non-negative values.

Edge cases fall out naturally: a strictly decreasing price list never triggers a profit update, so the answer stays 0; a single-element array returns 0 since no later selling day exists; and the buy-before-sell ordering is enforced automatically because the minimum is only ever drawn from the current or earlier days.

**Complexity:** `O(n)` time, `O(1)` space.
