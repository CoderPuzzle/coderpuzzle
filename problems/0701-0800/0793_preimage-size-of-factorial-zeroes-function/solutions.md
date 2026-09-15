# Solutions — Preimage Size of Factorial Zeroes Function

## Binary search on the inverse zero count

The number of trailing zeroes of `x!` is `zeta(x) = floor(x/5) + floor(x/25) + floor(x/125) + ...`, since each multiple of 5 contributes one factor of 5, each multiple of 25 one more, and so on (factors of 2 are always plentiful). Computing `zeta` needs only the loop `p = 5, 25, 125, ...` up to `x`, each term added once.

`zeta` is nondecreasing in `x`, so the smallest `x` with `zeta(x) >= k` can be found by binary search. The upper bound `5 * (k + 1) + 10` always suffices: `zeta(5 * (k+1))` is at least `k + 1`, so the target index lies below it. If `zeta` at the found position equals `k`, some `x` achieves exactly `k` zeroes; otherwise `k` was skipped and no `x` works.

The answer is always 0 or 5. Between consecutive multiples of 5 the count is flat, and each block of five values `5m..5m+4` shares one `zeta` value, so an achieved `k` has exactly five preimages. The count jumps by more than 1 only at multiples of 25, and the skipped values there are precisely the `k` with zero preimages — for example `k = 5`. The `k = 0` case works out to the five values `0!` through `4!`.

**Complexity:** `O(log^2 k)` time (`O(log k)` bisection steps, each evaluating `zeta` in `O(log k)` powers of 5), `O(1)` space.
