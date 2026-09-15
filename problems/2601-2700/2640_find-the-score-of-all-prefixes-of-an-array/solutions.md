# Solutions — Find the Score of All Prefixes of an Array

## Fused running maximum and running total

The answer is the prefix-sum array of the conversion array, and each
conversion value needs only the running maximum seen so far — so the whole
computation collapses into one pass that carries two scalars. At each element
the running maximum is raised if necessary (that single comparison is exactly
`max(arr[0..i])`, tracked incrementally instead of rescanning the prefix),
then `value + running_max` is folded into a running total, and the total is
emitted as `ans[i]`. The conversion array itself is never materialized: one
scalar pair replaces what the definition would store as `n` values.

Because every element contributes once and the loop visits each element once,
this stays linear in `n` with constant auxiliary space regardless of how
often or rarely new maxima appear — monotone inputs, sawtooth inputs, and
flat runs all take identical work.

The arithmetic outgrows 32 bits by design: a single conversion value already
reaches `10⁹ + 10⁹ = 2×10⁹`, just past `int32`, and the final score climbs to
`n × 2×10⁹ = 2×10¹⁴`. Typed languages therefore accumulate in 64-bit
integers. JavaScript has no such type, but its doubles are exact up to
`2⁵³ ≈ 9.0×10¹⁵`, and `2×10¹⁴` stays two-plus orders of magnitude below that,
so plain numbers carry every legal total exactly.

**Complexity:** `O(n)` time, `O(1)` extra space beyond the output array.
