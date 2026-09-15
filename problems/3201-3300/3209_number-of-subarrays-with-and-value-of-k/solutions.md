# Solutions — Number of Subarrays With AND Value of K

For a fixed right endpoint `r`, the AND values of the subarrays ending at
`r` are highly repetitive: writing the AND as a function of the left
endpoint `l`, the value can only lose bits as the window grows leftward,
so it takes at most one distinct value per cleared bit — under 31 distinct
values for inputs up to 10⁹. Counting subarrays with AND exactly `k`
therefore never needs to enumerate all `O(n²)` subarrays.

## Sweep (value, count) buckets of suffix ANDs

Maintain the distinct AND values of all subarrays ending at the current
index as `(value, count)` buckets. Stepping to the next element `x`, every
old bucket ANDs with `x` and a fresh one-element bucket `[x]` appears;
adjacent buckets that collapse to the same value merge their counts.
Because equal values are always contiguous in the bucket list, the merge
is a single linear pass, and the bucket count never exceeds ~31 — each
merge that changes a value clears at least one bit. Every subarray ending
at the current index is counted exactly once, at the bucket whose value
equals `k`, so summing the matching bucket counts over all right endpoints
counts each qualifying subarray once.

The whole-array answer is bounded by the total number of subarrays,
`n * (n + 1) / 2 = 5,000,050,000` at `n = 10⁵`, which overflows a signed
32-bit integer: accumulate in a 64-bit type (Java `long`, C++ `long long`,
Go `int64`, Rust `i64`; JS/TS numbers stay exact far past this bound,
below 2⁵³). An equally valid alternative reading of the same fact —
binary-searching the boundaries of the `k`-valued range per endpoint over
a sparse table, as the hints suggest — costs `O(n log n log V)`; the
bucket sweep achieves `O(n * 30)` directly.

**Complexity:** `O(n · 30)` time, `O(30)` space.
