# Solutions — Repeated Substring Pattern

## Try every proper block length

If `s` really is several copies of one block glued together, that block's
length `d` must divide `n = len(s)` and must be shorter than `n`: a block
taking the whole string is a single copy, not multiple copies. So only proper
divisor lengths can ever work, and `d` can only range up to `n / 2`. Walk
those candidate lengths, skip the ones that do not divide `n`, and test each
survivor.

Each test is one pass: rebuild the candidate as the first `d` characters
repeated `n / d` times and compare against `s`. The first match proves the
construction and returns `true`; if every proper divisor fails, `s` has no
period smaller than itself and the answer is `false`.

A length `n` has only `d(n)` divisors — 10⁴ itself has just 25 — so the sweep
performs a handful of linear comparisons in total, never anything quadratic.

**Complexity:** `O(n * d(n))` time, `O(n)` space.
