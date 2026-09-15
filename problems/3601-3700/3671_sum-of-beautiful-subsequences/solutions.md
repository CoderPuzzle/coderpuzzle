# Solutions — Sum of Beautiful Subsequences

## Divisor buckets and a Möbius descent

Counting is easy once the GCD condition is relaxed to divisibility. For a
fixed `g`, keep only the elements divisible by `g`, in their original
order, scaled down by `g`; scaling cannot disturb strict increase. A
subsequence lies in this filtered list exactly when its GCD is a multiple
of `g`, so counting the strictly increasing subsequences of the filtered
list yields `cnt[g]`, the number whose GCD is _divisible_ by `g`. That
count comes from the classic left-to-right recurrence: element `i`
contributes `1 +` (the total weight of earlier elements of strictly
smaller value), which coordinate compression turns into prefix sums over
value ranks — precisely what a Fenwick tree answers and updates in
logarithmic time. Equal values never chain, because only strictly smaller
ranks are ever read.

The buckets are built up front instead of rescanning the array per `g`: a
smallest-prime-factor sieve factorizes each distinct value once, expanding
the factorization into divisors and appending the element's index to
bucket `d` for every divisor `d`. The work is linear in
`T = sum(d(nums[i]))`, the number of (element, divisor) pairs. Then a
descending sweep over `g` converts divisibility counts into exact ones:
`F[g] = cnt[g] - F[2g] - F[3g] - ...` — every subsequence with GCD exactly
a proper multiple of `g` was already peeled off by the time `g` is
reached — and the answer accumulates `g * F[g]`. Buckets that never fire
have `cnt[g] = 0`, hence `F[g] = 0`, and drop out of both sweeps for free.

Modular care is routine but easy to get wrong in fixed-width languages.
Every stored count is reduced below the modulus at write time, so a
Fenwick prefix sum adds at most about `log2(max(nums))` sub-modulus terms
— comfortably inside 64 bits — and `g * F[g]` is below
`7 * 10^4 * (10^9 + 7) < 2^47`, also a 64-bit product; reductions happen
before anything can grow past that. The sieve is `O(max(nums))`, the
per-bucket counting is `O(T log(max(nums)))`, and the harmonic
multiple-subtraction sweep is `O(max(nums) * log(max(nums)))`.

**Complexity:** `O((T + M) log M)` time, `O(T + M)` space, where `M` is
`max(nums)` and `T` is the total number of (element, divisor) pairs.
