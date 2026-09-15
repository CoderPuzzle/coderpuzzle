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

## One pass, cheapest price so far

Any sale is fixed by two days: the day it sells and the cheapest day before it. That collapses the search — while scanning left to right, only two numbers ever need to be remembered, the minimum price seen so far and the best profit banked so far. Each day either lowers that minimum or offers `price - cheapest` as a candidate; every buy/sell pair the brute force would compare is dominated by one of these updates, because a seller only ever wants the cheapest prefix behind the sale.

The code walks `prices` once, folding `cheapest` down with `min` and `best` up with `max`. On the day a new minimum appears, `price - cheapest` is 0, so the same day can never fake a profit by selling to itself — and since `best` starts at 0 rather than negative infinity, prices that only fall leave it untouched and the method returns the statement's no-profit `0`.

**Complexity:** `O(n)` time, `O(1)` space.
