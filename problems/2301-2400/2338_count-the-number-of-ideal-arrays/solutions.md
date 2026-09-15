# Solutions — Count the Number of Ideal Arrays

## Divisor Chains by Length with Stars-and-Bars

An ideal array is non-decreasing, and its distinct values form a chain `v1 | v2 | ... | vL` under strict divisibility (each strictly divides the next, since the array never decreases and consecutive distinct values must divide). Conversely, any such chain of length `L` spreads into ideal arrays by giving each value a contiguous non-empty block of positions; the number of ways to cut `n` positions into `L` ordered non-empty blocks is the stars-and-bars count `C(n-1, L-1)`. So the answer is `Σ_L C(n-1, L-1) · (number of chains of length L)`, with distinct chains producing distinct arrays.

The chain counts come from a sieve-style DP. Let `dp[v]` be the number of strict chains of the current length ending at value `v`, initialized with one chain per value for length 1. Extending a chain appends a strict multiple: for each `v`, add `dp[v]` into `ndp[m]` for every multiple `m = 2v, 3v, ...` up to `maxValue`. The sieve ordering makes each extension a harmonic-sum pass over `maxValue`. After each length the total is multiplied by the running binomial, updated incrementally via `C(n-1, L) = C(n-1, L-1) · (n-L) / L` with a modular inverse for the division, all modulo `10^9 + 7`.

Two facts keep this fast. First, a strict chain at least doubles at each step, so no chain exceeds `log2(maxValue) + 1` values (about 14 for `10^4`); the loop breaks as soon as `dp` is all zero, long before `n` iterations. Second, values can exceed `10^9` after multiplication, so every accumulation is reduced. Edge behavior: length-1 chains already cover the constant arrays via `C(n-1, 0) = 1`, and `maxValue = 1` degenerates to the single all-ones array.

**Complexity:** `O(maxValue · log²(maxValue))` time (at most `log2(maxValue) + 1` sieve passes of harmonic-sum cost), `O(maxValue)` space.
