# Solutions — Generate Fibonacci Sequence

## Iterative Fibonacci Generator

The generator is an unbounded loop that yields and then slides a two-value
window forward. It starts by yielding the defined first pair — 0, then 1 —
because the recurrence `Xn = Xn-1 + Xn-2` only needs two seeds; every
further `.next()` computes `a + b` into a temporary, shifts `a = b`,
`b = next`, and yields it, so term k is produced with one addition and no
recursion and no memo table.

Because the sequence is infinite, nothing in the generator decides when
to stop: termination is purely the caller's concern. The bundle-provided
carrier steps the generator exactly `callCount` times (zero times leaves
an empty list for `callCount = 0`) and compares those collected numbers.
The domain stays inside exact machine arithmetic: the largest value any
case can request is F(49) = 7778742049, far below
`Number.MAX_SAFE_INTEGER = 2^53 - 1`, so plain Number arithmetic is
lossless throughout.

**Complexity:** `O(callCount)` time per case, `O(1)` auxiliary space.
