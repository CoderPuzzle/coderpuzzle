# Solutions — Smallest Range II

Every element travels exactly `k`, up or down, so the score is decided by
where the shifted extremes land. Sorting lines the choices up so that a best
plan has one simple shape — a prefix of the array rises by `k` while the
suffix falls by `k` — and a single scan over the possible cut points finds
it.

## Scan the cut points of the sorted array

In a best plan, no small value falls while a larger one rises: with `x <= y`
the pair `{x - k, y + k}` sits strictly wider apart than `{x + k, y - k}`,
and exchanging the two directions can only pull the running maximum down and
the running minimum up. So after sorting, some optimal assignment lifts
every element left of a cut and lowers every element right of it — and the
two cut-free plans, everyone rising or everyone falling, shift the whole
array in lockstep and keep the raw span `nums[n-1] - nums[0]` as a candidate
the scan must not forget.

With the first `i` sorted elements rising and the rest falling, the maximum
can only be `nums[i-1] + k` (the top of the lifted prefix) or
`nums[n-1] - k` (the top of the lowered suffix), and the minimum can only be
`nums[0] + k` or `nums[i] - k`. Evaluating `max` of the two highs minus
`min` of the two lows at every cut `i` from 1 to `n-1`, against the raw
span, is the whole algorithm. Example 3 is the interior cut: `[1,3,6]` with
`k = 3` cuts after the 3, landing on `[4,6,3]` for a score of 3, while
Example 2's `[0,10]` cuts between the two elements and Example 1 has no cut
at all, leaving the span of a single element. Ties need no special care —
every cut is evaluated, so identical neighbors just repeat a candidate.

Values live in `0..10⁴` and `k` is at most `10⁴`, so every shifted value
stays inside `[-10⁴, 2·10⁴]` and every candidate score inside `3·10⁴`, far
within the native 32-bit integers the signature already uses.

**Complexity:** `O(n log n)` time, `O(1)` space.
