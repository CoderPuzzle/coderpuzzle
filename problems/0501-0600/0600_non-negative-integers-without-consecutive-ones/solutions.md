# Solutions — Non-negative Integers without Consecutive Ones

## Fibonacci Digit Counting over the Binary Representation

Counting valid integers up to `n` directly is infeasible (`n` can be 10^9), but every integer below `n` corresponds to a binary string that is lexicographically smaller than `n`'s bit string at some position. The solution scans `n`'s bits from most significant to least and, at each position where `n` has a 1, counts all valid strings that place a 0 there — those strings are strictly smaller than `n` from that point on, so their remaining lower bits can be any valid suffix.

The number of valid suffixes of each length is precomputed with a Fibonacci recurrence: a valid string of length `i` either starts with 0 (followed by any valid string of length `i-1`) or with 10 (followed by any valid string of length `i-2`), so `fib[i] = fib[i-1] + fib[i-2]` with `fib[0] = 1` and `fib[1] = 2`. Placing a 0 at position `i` of `n`'s `m`-bit string therefore contributes `fib[m - i - 1]` valid integers.

Two boundary rules finish the count. If `n` itself contains two consecutive ones — detected when a 1 bit immediately follows another 1 — every number sharing that prefix pattern is also invalid, so the scan stops early and returns only the strictly-smaller count. Otherwise `n`'s own bit string is valid and a final `+1` includes `n` itself.

Everything is derived from the bit length of `n`, which is at most 30 for the given constraint, so the Fibonacci table and the scan are both tiny.

**Complexity:** `O(log n)` time, `O(log n)` space.
