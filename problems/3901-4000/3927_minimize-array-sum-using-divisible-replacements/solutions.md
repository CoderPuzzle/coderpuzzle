# Solutions — Minimize Array Sum Using Divisible Replacements

## Present-divisor sieve

If a value `p` is present, any present multiple `m` of `p` can be replaced
with `p` directly. Repeated replacements can only travel down a divisibility
chain, so each original value independently becomes the smallest present
divisor of itself. Values that do not divide another present value remain
unchanged.

Mark the present values in a boolean table, then process present divisors in
ascending order and update every present multiple with the first divisor that
can reach it. Finally sum the best divisor for each element. The maximum sum
is `10⁵ * 10⁵ = 10¹⁰`, so fixed-width languages use 64-bit integers.

**Complexity:** `O(V log V + n)` time, `O(V)` space, where `V = 10⁵`.
