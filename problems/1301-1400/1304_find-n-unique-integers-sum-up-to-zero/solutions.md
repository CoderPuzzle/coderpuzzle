# Solutions — Find N Unique Integers Sum up to Zero

## Symmetric pairs around zero

Every value `x` can be cancelled by a `-x`, so the simplest construction is to emit the whole symmetric block from `-n/2` to `n/2` and let each number pair with its negation. The only wrinkle is parity: an even `n` cannot include `0` without ending up with `n + 1` values, so the walk skips the middle zero exactly when `n` is even, and an odd `n` keeps it as the unpaired center value.

The code builds the array by walking `value` from `-half` to `half` where `half = n / 2`, pushing every value except a `0` that would appear for an even `n`. For an odd `n` the emitted values are `-half, ..., -1, 0, 1, ..., half` — `n` values summing to 0 — and for an even `n` they are `-half, ..., -1, 1, ..., half` — again `n` distinct values summing to 0, since every positive value has its negative present and nothing is left over.

Each output element is produced in constant time, so the work is linear in `n`, and the output array is the only storage beyond a few scalars.

**Complexity:** `O(n)` time, `O(n)` space for the returned array.
