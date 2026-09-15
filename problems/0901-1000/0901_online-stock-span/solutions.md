# Solutions — Online Stock Span

## Monotonic Stack of Prices with Absorbed Spans

The naive answer — store every price and walk backward from today until a
strictly greater price appears — repeats work: the same run of small prices is
re-scanned by every later day that dominates them. The `StockSpanner` class
instead keeps a stack of `(price, span)` pairs whose prices are **strictly
decreasing** from bottom to top.

`next(price)` starts with a span of `1` (today itself) and pops every stack
entry whose price is less than or equal to `price`, adding each popped entry's
span to today's. Those popped days are permanently retired: any future day
that could have counted them must first get past today's `price`, which is
greater than or equal to all of them — so it counts today instead, and today's
entry already carries their total. The first entry remaining below, whose
price is strictly greater, is precisely the wall that stops today's count;
`1 + the absorbed spans` is therefore the exact answer. Pushing
`(price, span)` restores the decreasing invariant.

Each price is pushed once and popped at most once, so the total work across
the whole stream is linear even though a single `next` may pop many entries.
Both the Python and Java canonical solutions implement exactly this structure
(`list` / `ArrayDeque` of `int[]` pairs). With at most `10⁴` calls the stack
never exceeds `10⁴` entries.

**Complexity:** `O(1)` amortized per `next` (`O(n)` total over the stream),
`O(n)` space in the worst case (strictly decreasing prices).
