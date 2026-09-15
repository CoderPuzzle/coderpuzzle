# Solutions — Count Distinct Subarrays Divisible by K in Sorted Array

## Remainder sweep with per-run deduplication

The count starts from the classic positional sweep. With a running prefix
remainder (seeded with the empty prefix's remainder 0), a window `[l, r]`
sums to a difference of two prefixes and is good exactly when both prefixes
leave the same remainder modulo `k`. Sweeping rightward while a map remembers
how many earlier prefixes hold each remainder, every right end adds the count
stored under its own remainder. After the sweep, `total` has counted every
good window once per position it occupies.

Position, however, is not what the statement counts, and sortedness says
exactly where the repetitions live. Two spans read identically only if they
start inside the same run of equal values and take the same number of
elements from it: once a span crosses a strict increase, its first value pins
the run it starts in, and the crossing point plus the two edge take-counts
pin the whole sequence. So windows spanning several runs never collide, and
the only overcounting comes from windows wholly inside one run. For a run of
length `a` holding value `v`, each qualifying length `L` occurs `a - L + 1`
times but deserves one count, an excess of `a - L`. With `g = gcd(v, k)` the
qualifying lengths are the multiples of `k / g`; if `c` of them fit in the
run, their excesses telescope to `c * a - (k / g) * c * (c + 1) / 2`.
Subtracting that per run leaves one count per distinct value sequence.

Both quantities outrun 32 bits at the constraint ceiling. With `k = 1` every
subarray qualifies, and an all-distinct array makes the answer
`n * (n + 1) / 2 ≈ 5 × 10⁹`, so fixed-width languages return and accumulate
in 64-bit integers; prefix remainders stay below `k ≤ 10⁹`, but adding an
element before reducing touches `10⁹ + 10⁹`, so that addition is also kept in
64 bits even though every element fits in 32. All intermediate magnitudes
stay under `10¹⁴`, far inside JavaScript's `2⁵³` exact range.

**Complexity:** `O(n)` time, `O(n)` space.
