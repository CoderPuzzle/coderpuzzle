# Solutions — Smallest All-Ones Multiple

The candidates are the repunits 1, 11, 111, ... — each appends one digit 1 to
its predecessor, and they strictly grow, so the first one divisible by `k` is
the smallest. Building them outright is hopeless: the answer can have as many
digits as `k` itself, up to `10⁵`. Only the remainder matters.

## Remainder Walk with a Seen Set

Appending a digit maps `n → 10·n + 1`, and remainders respect the same rule:
`rem → (rem·10 + 1) mod k`. Starting from `rem = 1 mod k` and length 1, each
step appends one digit and asks whether the current repunit is divisible by
`k` — `rem = 0` — while the running length counts its digits. The walk never
materializes a number larger than `10·k + 1`, and since repunits strictly
increase, the first length whose remainder is 0 is the answer.

Termination comes from the pigeonhole principle. A nonzero remainder is one of
`k − 1` values, so if `k` steps pass without hitting 0, some remainder has
repeated — and from there the sequence of remainders cycles forever, never
reaching 0. A boolean `seen` array of size `k` (the hash table of the tag
list) marks each visited remainder; a repeat returns `-1`. Concretely, that
fate is exactly the `k` divisible by 2 or 5: a repunit ends in 1, so it is
never even and never a multiple of 5, while every other `k` is reached within
`k` steps. The answer is thus at most `k ≤ 10⁵`, and the largest intermediate
value `rem·10 + 1 < 10⁶` fits comfortably in a 32-bit integer — JavaScript
and TypeScript numbers are exact far beyond it, so every language computes
with its native integer type. The walk is iterative, so no stack is consumed.

**Complexity:** `O(k)` time, `O(k)` space.
