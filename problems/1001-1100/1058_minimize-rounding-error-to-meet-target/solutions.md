# Solutions — Minimize Rounding Error to Meet Target

## Floor everything, then greedily flip the largest fractions to ceilings

Work in thousandths so every price is an exact integer: `"1.500"` becomes
`1500`, split into an integer part (the floor) and a fractional part in
`[0, 1000)`. A price with fractional part `0` is already an integer —
its floor and ceiling coincide, so it contributes nothing to the error
and offers no choice. For every other price, flooring costs `frac`
thousandths and ceiling costs `1000 - frac` thousandths, and ceiling is
always exactly one more than flooring in value.

Summing every price's floor gives the smallest reachable total, and
adding one for every fractional price gives the largest reachable total
(everything ceiled); `target` is achievable only when it falls in that
inclusive range, otherwise `"-1"`. Otherwise flooring everything reaches
`target` short by exactly `k = target - sum(floors)`, so exactly `k` of
the fractional prices must be switched to their ceiling. Switching a
price with fractional part `f` changes its contribution from `f` to
`1000 - f`, a net change of `1000 - 2f` — smallest (most negative, i.e.
cheapest) when `f` is largest. Sorting the fractional prices by `f`
descending and switching the first `k` therefore reaches `target` at
the least possible added cost; equal fractions are interchangeable
since switching any of them changes the total by the same amount.
Every quantity here is an exact integer count of thousandths, so the
final total converts to the required three-decimal string with no
floating-point rounding anywhere in the computation.

**Complexity:** `O(n log n)` time, `O(n)` space, where `n` is the length
of `prices`.
