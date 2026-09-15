# Solutions — Closest Dessert Cost

## Reachable topping sums against every base

The toppings form a tiny bounded knapsack: each of the `m <= 10` topping
types can be taken 0, 1, or 2 times, so the set of reachable topping
totals is built iteratively — start from `{0}`, and for each topping
price `t` replace the set by `{s, s + t, s + 2t}` for every sum `s`
already in it. Duplicates collapse in the set, and since every topping
price is at most `10⁴`, the set never holds more than `2 x 10⁵` values.
No recursion is needed, so no language risks a frame limit.

With that set in hand, every dessert cost is `b + s` for some base price
`b` and some topping sum `s`. Walk all `n` bases against all reachable
sums and keep the candidate minimizing `|b + s - target|`, breaking ties
toward the smaller cost, exactly as the statement demands. All totals fit
comfortably in 32-bit integers (`10⁴ + 2 x 10 x 10⁴ = 210000` at the
ceiling), so no widened arithmetic is required anywhere.

**Complexity:** `O(n x U)` time, `O(U)` space, where `U` is the number of
reachable topping sums (at most `3^m`, capped by the sum of all topping
prices).
