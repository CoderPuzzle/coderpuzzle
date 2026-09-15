# Solutions — Minimum Time to Eat All Grains

## Binary Search with Greedy Feasibility

Binary search the answer: if the hens can finish within `t` seconds they can
finish within any larger budget too, so feasibility is monotone in `t` and the
minimum feasible integer can be bisected over `[0, 2 · 10⁹]`. To test a
candidate `t`, sort both arrays and hand each hen, in ascending order, a
contiguous prefix of the leftover grains. An exchange argument shows some
optimal assignment takes this shape: swapping two hens whose grain ranges
interleave never increases the maximum segment time.

Within one hen's segment the geometry is one-dimensional: a hen at `h` that
must cover everything from the leftmost uneaten grain to some further grain
pays `L + R + min(L, R)` seconds, where `L = max(0, h − leftmost)` and
`R = max(0, rightmost − h)`. Whichever extreme it reaches second is walked
twice; trying both visit orders and keeping the cheaper is exactly
`min(2L + R, L + 2R)`. The greedy check therefore advances a grain pointer
while this cost stays within `t`, hands the remainder to the next hen, and
succeeds when every grain is consumed. Since all positions lie in
`[0, 10⁹]`, `L + R ≤ 10⁹` for every segment, so costs stay at or below
`1.5 · 10⁹`; 64-bit accumulators keep the arithmetic comfortably safe.

**Complexity:** sorting plus about thirty-one linear sweeps of both arrays,
so `O((n + m)(log n + log m + log A))` time with `A` the position bound;
`O(1)` extra space beyond sorting.
