# Solutions — Divisible and Non-divisible Sums Difference

## Arithmetic progression sums

Both definable sums are arithmetic progressions, so neither needs a loop.
The integers in `[1, n]` divisible by `m` are exactly `m, 2m, ..., km` where
`k = floor(n / m)`, and their sum is `num2 = m * k * (k + 1) / 2`. The whole
range sums to `n * (n + 1) / 2`, and every integer in it is either a multiple
or not, so `num1 = n * (n + 1) / 2 - num2` — the full progression minus the
multiples.

The requested difference `num1 - num2` then collapses to
`n * (n + 1) / 2 - 2 * num2`, computed from a single quotient. The degenerate
ranges fall out of the same formula with no special casing: `m = 1` makes
`k = n`, so `num2` absorbs the entire range and the answer is
`-n * (n + 1) / 2` (Example 3), while `m > n` makes `k = 0`, so `num2`
vanishes and the answer is the full range sum (Example 2).

The bounds keep this safe in every offered language without wider types:
`n <= 1000` limits the full-range sum to `500500`, and the largest partial
product, `m * k * (k + 1) <= n * (k + 1) <= 1001000`, is far inside a signed
32-bit integer (and exact as a JavaScript Number, well under `2^53`).
Dividing by 2 is exact because `k * (k + 1)` is always even, so no
fractional value ever arises.

**Complexity:** `O(1)` time, `O(1)` space.
