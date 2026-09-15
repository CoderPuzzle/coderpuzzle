# Solutions — Number of Orders in the Backlog

## Two heaps simulate the backlog

Matching only ever looks at the two extremes of the backlog — the
cheapest sell and the priciest buy — so a min-heap of sell batches and a
max-heap of buy batches, keyed by price, answer every "who trades next"
question in logarithmic time. Each `orders[i]` is one batch and takes one
heap slot, exactly as the constraints intend: `10⁵` batches never
explode into `10¹⁴` individual orders.

An incoming buy trades while the cheapest sell costs at most its price
(and a sell, dually, while the priciest buy bids at least its price):
each round exchanges `min` of the two amounts against the heap top,
drops the opposing batch when its amount reaches zero, and continues
with the next-best batch until the price condition fails or the incoming
amount is exhausted. Whatever remains joins the incoming side's heap as
one new batch, so partially consumed batches keep trading later with
their reduced amounts.

The final answer sums every amount still in the two heaps. That total
reaches `10⁵ × 10⁹ = 10¹⁴`, past 32-bit range, so the accumulation is
kept in 64-bit integers everywhere (JavaScript's numbers hold it
exactly, being below `2⁵³`) and reduced modulo `10⁹ + 7` once, at the
very end.

**Complexity:** `O(n log n)` time, `O(n)` space.
