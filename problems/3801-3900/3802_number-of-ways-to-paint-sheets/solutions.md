# Solutions — Number of Ways to Paint Sheets

A valid painting is an ordered pair of distinct colors plus a split point:
the first color covers a prefix of `x` sheets, the second the suffix of
`n - x`, and each side must respect its color's cap. Counting pairs split by
split and summing over `x` would visit up to `10⁹` splits, but the per-split
count only moves when `x` crosses a limit boundary — so the whole sum
collapses onto a sweep of `O(m)` breakpoints.

## Breakpoint Sweep over Split Lengths

Fix a split length `x`. The ordered pairs (first color `i`, second color `j`,
`i != j`) whose caps admit `x` and `n - x` number `num_ge(x) * num_ge(n - x)

- num_ge(max(x, n - x))`: all pairs satisfying both caps, minus the `i == j`diagonal, which needs a single cap to cover the larger of the two sides.`num_ge(t)`— how many colors have`limit >= t`— is one lower-bound search
on the sorted limit array, so each split costs`O(log m)`to evaluate. As`x`runs from 1 to`n - 1`, this per-split count is a step function:
`num_ge(x)`drops exactly at`L + 1`, `num_ge(n - x)`jumps exactly at`n - L`, and the `max(x, n - x)`argument switches at`ceil(n / 2)`. Nothing
  else moves it.

Collecting `1`, `n`, the switch point, and `L + 1` and `n - L` for every
limit `L` (clamped into `[1, n]`), then sorting and deduplicating, yields at
most `2m + 3` breakpoints; the step function is constant across each
consecutive run. One representative evaluation per run, scaled by the run
length, covers every split in the run — including runs millions of splits
long around `x ≈ n / 2`, which no per-split loop could ever walk. Summing
the scaled pieces modulo `10⁹ + 7` gives the answer.

The numeric shape stays narrow. The unreduced per-split count never exceeds
`m² <= 10¹⁰` — exact in 64-bit integers and in JavaScript doubles alike,
comfortably below `2⁵³` — and after reduction each term is below the
modulus, so multiplying by a run length up to `n - 1 < 10⁹` keeps the
product near `10¹⁸`, inside i64 range. The JavaScript and TypeScript ports
perform exactly that one product (reduced count times run length) in BigInt,
since it can pass `2⁵³`; every other port uses plain 64-bit arithmetic.

**Complexity:** `O(m log m)` time, `O(m)` space.
