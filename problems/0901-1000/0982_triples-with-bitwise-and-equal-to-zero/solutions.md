# Solutions — Triples with Bitwise AND Equal To Zero

Counting ordered index triples one by one is cubic, but the first two indices
can be settled together: their AND is a single 16-bit value, and the third
index only decides whether that value survives. Grouping the `n²` pairs by
their AND value lets every third element answer for a whole class of pairs at
once.

## Pair counts, subset sums, complement lookups

Build `f`, a direct-addressed table of `2¹⁶` 64-bit counters indexed by value,
where `f[v]` is the number of ordered pairs `(i, j)` with
`nums[i] & nums[j] == v`; one pass over the `n²` pairs fills it. The triple
condition then decides only how the third index treats `v`:
`nums[i] & nums[j] & nums[k] == 0` holds exactly when `v` is a submask of
`~nums[k]` — every bit `v` carries must be absent from `nums[k]`. So a fixed
`k` covers `h[~nums[k] & 0xFFFF]` pairs, where `h[m]` sums `f[v]` over every
submask `v` of `m`.

Rather than enumerating submasks for each lookup, the whole `h` table falls
out of a subset zeta transform over the 16 bits: for each bit in turn, every
mask carrying it absorbs the entry of the same mask with the bit cleared.
After the 16 passes `h[m]` holds the sum of `f` over the submasks of `m` — a
submask `v` of `m` differs from `m` in the bits it lacks, and it reaches `m`
through exactly one chain of single-bit additions, one bit per pass in the
fixed order the bits are processed, so it contributes exactly once. Values
fit 16 bits by the constraints, so the complement is masked to `0xFFFF`
before the lookup. Pair counts reach `n² = 10⁶` and the answer reaches
`n³ = 10⁹`, so the table entries and the total are 64-bit wide.

**Complexity:** `O(n² + n + 2¹⁶ · 16)` time, `O(2¹⁶)` space.
