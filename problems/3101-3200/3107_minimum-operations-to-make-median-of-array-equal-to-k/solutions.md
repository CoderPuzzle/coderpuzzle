# Solutions — Minimum Operations to Make Median of Array Equal to K

## Sort and split around the median slot

Sorting fixes the median's identity once and for all: with `n` sorted
elements the median is the one at index `n // 2` — the middle element
when `n` is odd, and automatically the larger of the two middle values
when `n` is even, which is exactly how the statement defines it. Every
unit move costs one operation regardless of direction, so the cheapest
way to give the sorted array its required shape at value `k` spends only
on elements that are on the wrong side of `k`: those before the median
slot need to come down to `k`, those after it need to come up.

The answer sums three terms — the distance from `k` to the median
element itself, plus `a[i] - k` over each element left of the slot still
above `k`, plus `k - a[i]` over each element right of the slot still
below `k`. Lowering an over-tall left element never hurts anything to
its right (sorted order keeps the prefix below the suffix), and raising
an under-short right element likewise leaves the left intact, so no
element ever needs to overshoot `k`. The sum can reach roughly
`10⁵ × 10⁹ = 10¹⁴` at the constraint maximum, so all accumulators are
64-bit (`Number` stays exact in JS/TS since `10¹⁴ ≪ 2⁵³`).

**Complexity:** `O(n log n)` time, `O(1)` extra space (in-place sort).
