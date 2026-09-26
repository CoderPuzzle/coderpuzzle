# Solutions — Number of Ways of Cutting a Pizza

## Apple-count prefix sums and a memo over the remaining piece

After any sequence of cuts the piece still to be cut is always the
rectangle whose bottom-right corner is the pizza's, so its identity is
just its top-left corner. State `(r, c, remaining)` — number of ways to
make `remaining` more cuts on the rectangle starting at `(r, c)` — makes
the search space `50 · 50 · 10`, small enough to memoize.

Two ingredients make the transitions `O(1)` per candidate cut. First, a
2D prefix-sum table over apples answers "does rectangle `(r, c)` to
`(rows-1, cols-1)` hold an apple?" in constant time. Second, the cut
enumeration: a horizontal cut above row `i` hands away rows `r..i-1` and
recurses on `(i, c)`, valid when the handed-away strip has an apple and
the kept piece still does; vertical cuts are symmetric over columns. The
base case is `remaining == 0`: exactly one way when the final piece holds
an apple, none otherwise.

![On pizza = ['A..', 'AAA', '...'] with k = 3, state dp(0, 0, 2) fans over its four first cuts: the two cuts whose kept piece still holds an apple contribute dp(1, 0, 1) = 2 and dp(0, 1, 1) = 1 while the other two contribute 0, for 3 ways.](figures/solution-pizza-cut-fanout.svg)

The recursion depth is at most `k <= 10`, so no stack concerns, and all
counts are reduced modulo `10⁹ + 7` as they combine; intermediate sums
stay below `10⁹ · 100`, safe in 64-bit arithmetic.

**Complexity:** `O(rows · cols · k · (rows + cols))` time,
`O(rows · cols · k)` space for the memo plus `O(rows · cols)` for the
prefix table.
