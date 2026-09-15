# Solutions — Construct the Minimum Bitwise Array I

## Per-element ascending scan

For a single target `x`, the condition `a OR (a + 1) = x` is easy to test
directly, so the minimum can be found by trying candidates from the bottom:
scan `a` over `0, 1, 2, ...` and take the first value with
`a OR (a + 1) == x`; if the scan reaches `x` without success there is no
answer and the entry is -1. The scan never needs to go past `x - 1`,
because `a OR (a + 1)` is at least `a + 1`, so any solution for `x` already
satisfies `a <= x - 1`.

The impossibility case has a one-line shape: `a OR (a + 1)` always has its
lowest bit set (`a + 1` flips the low zero bits of `a` up, and OR-ing `a`
back in leaves at least that final 1), so it is always odd. Among primes
only 2 is even — every other entry of `nums` admits a candidate, and the
examples' values (3 to 1, 5 to 4, 11 to 9, 13 to 12, 31 to 15) all fall out
of the scan.

With `n <= 100` and `nums[i] <= 1000` the total work is at most a few
hundred thousand constant-time tests. All intermediate values stay far
inside 32-bit range, so every language keeps plain int arithmetic.

**Complexity:** `O(n * max(nums))` time, `O(1)` extra space (beyond the
output array).
