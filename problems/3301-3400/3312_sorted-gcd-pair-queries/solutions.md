# Solutions — Sorted GCD Pair Queries

Materializing `gcdPairs` is impossible — it holds `n * (n - 1) / 2` up to
`≈ 5 * 10⁹` entries — but only the value at one sorted position per query
is needed, so it suffices to know how many pairs have each possible GCD
value and to prefix-sum those counts. Both sections count pairs per
divisor over the small universe `max(nums) ≤ 5 * 10⁴`: the elements `d`
divides form the pool of pairs whose GCD is a multiple of `d`, and one
prefix-summed table turns every query into a binary search. Möbius
inversion collapses the multiple-of-`d` counts to exact-GCD counts with
signed `μ` weights from a sieve; the divisor-bucket walk reaches the
same counts by subtracting every proper multiple's already-finalized
count, largest `d` first.

## Bottom-up Möbius inversion over the divisor sums

A linear sieve fills a Möbius table over `[1, max(nums)]` first:
`mu[1] = 1`, `mu[n] = 0` as soon as a squared prime divides `n`, and
otherwise the sign flips with every new prime — `O(V)` work, no
factorizations. One ascending harmonic sweep then sums the value
frequencies over multiples to get `count[d]`, the number of elements
`d` divides, and `pairs[d] = count[d] choose 2` counts every pair whose
GCD is a multiple of `d` — the divisor sums the inversion works over.

The exact counts fall out of the identity
`exact[d] = Σ mu[k] * pairs[d * k]`: `pairs[d]` lumps together the
exact counts of `d` and of every proper multiple, and the Möbius
weights are the one set of signs that unmixes them — `Σ_{k | m} mu(k)`
is `1` only at `m = 1` and vanishes for every other `m`. A second
harmonic sweep evaluates that sum for every `d` in ascending order,
over the same multiples the first sweep touched, and the shared prefix
sum plus binary search finish the queries.

Pair counts peak at `n * (n - 1) / 2 ≈ 5 * 10⁹`, so the counts and the
query indices are held in 64-bit integers (exact in JS/TS numbers,
below 2⁵³); each returned answer is a GCD, at most `5 * 10⁴`, so the
result array stays 32-bit.

**Complexity:** `O(V log V + n + q log V)` time, `O(V + q)` space.

## Divisor-bucket counting with inclusion-exclusion

Bucket the input frequencies and, for each divisor `d`, count how many
array elements `d` divides: any two of them form a pair whose GCD is a
multiple of `d`. That over-counts, so walk `d` from `max(nums)` down to 1
and subtract, from each bucket, the already-finalized exact counts of
every proper multiple — classic inclusion-exclusion, which leaves
`exact[d]` = the number of pairs whose GCD is exactly `d`. A prefix sum
over ascending `d` then answers each query `q` by binary search: the
answer is the smallest `d` whose prefix count exceeds `q`.

Pair counts peak at `n * (n - 1) / 2 ≈ 5 * 10⁹`, which overflows 32-bit
arithmetic mid-computation, and the query indices reach the same scale —
they are read as 64-bit integers (exact in JS/TS numbers, below 2⁵³).
Every answer itself is a GCD, at most `5 * 10⁴`, so the returned array
stays 32-bit. The harmonic divisor loops cost
`O(V log V)` for `V = max(nums)`; an equivalent bottom-up Möbius
inversion over the same divisor sums produces identical counts with the
same asymptotics.

**Complexity:** `O(V log V + n + q log V)` time, `O(V + q)` space.
