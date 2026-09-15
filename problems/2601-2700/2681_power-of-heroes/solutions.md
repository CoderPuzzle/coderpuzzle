# Solutions — Power of Heroes

## Sorted Sweep with Running Subset Sum

Sort the strengths ascending and consider each element `x` as the maximum of its group, so the group's power is `x^2 * min`. Any element before `x` can serve as the minimum, and the elements strictly between that minimum and `x` are free padding that may be included or excluded — a group with minimum `v` and maximum `x` therefore comes in `2^(count of elements between them)` variants, all sharing the same power `x^2 * v`.

Those variant counts collapse into a single accumulator `s = sum of v * 2^(elements after v)` over the prefix processed so far. When the sweep advances, every existing (minimum, padding) combination survives either with or without the just-processed element as padding — doubling `s` — and the new element itself registers as a fresh minimum, hence `s = 2 * s + x`. The contribution added at `x` is `x^2 * (s + x)`, the `+ x` covering the singleton group where `x` is its own minimum.

All arithmetic is folded under the modulus at every step, since the raw values reach `(10^9)^3`. The sort dominates the runtime and the sweep itself keeps only two scalars beyond the sorted copy.

**Complexity:** `O(n log n)` time, `O(n)` space.
