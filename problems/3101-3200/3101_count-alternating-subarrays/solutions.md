# Solutions — Count Alternating Subarrays

Every alternating subarray lies entirely inside one alternating stretch
— a maximal window in which adjacent elements always differ — because
crossing a position where `nums[i] == nums[i - 1]` is impossible, and no
subarray can span two different stretches.

## Count the runs ending at each index

Scan once keeping `current`, the length of the longest alternating
subarray ending exactly at the current index. When `nums[i]` differs from
`nums[i - 1]`, every alternating suffix that ended at `i - 1` extends by
one element and a new one-element suffix appears, so `current` grows by
one; when the two values are equal, every alternating run is severed and
`current` resets to one. Each index therefore contributes exactly
`current` brand-new alternating subarrays — the ones ending at it — and
summing `current` over all indices counts every alternating subarray once,
at its own right endpoint.

Over an alternating stretch of length `L` this simply accumulates
`1 + 2 + ... + L`, so
the scan reproduces the per-run triangular totals without ever slicing
runs out explicitly. The whole-array maximum is `n * (n + 1) / 2 =
5,000,050,000` at the constraints, which overflows a signed 32-bit
integer: accumulate in a 64-bit type (Java `long`, C++ `long long`, Go
`int64`, Rust `i64`; JS/TS numbers are exact far past this bound, below
2⁵³).

**Complexity:** `O(n)` time, `O(1)` space.
