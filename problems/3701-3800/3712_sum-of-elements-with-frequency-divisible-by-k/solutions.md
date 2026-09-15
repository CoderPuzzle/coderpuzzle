# Solutions — Sum of Elements With Frequency Divisible by K

## Value-bucket frequency sweep

Qualification is decided per value, never per occurrence, so the whole task
collapses into counting: one pass over nums drops each element into the
bucket of its own value, and one ascending scan over the buckets collects
the answer. Values are bounded by 100, so the buckets live in a fixed array
indexed by the value itself — no map and no key comparison anywhere. A
bucket qualifies exactly when its count is a positive multiple of k, and a
qualifying bucket releases value * count into the running total, which is
precisely that element contributing once per occurrence.

Two details pin the sweep down. The count > 0 guard keeps never-seen values
out of the scan's decisions — letting an empty bucket through would be
harmless anyway, since it adds value * 0 = 0, but skipping it states the
intent that only values present in nums can contribute. And because
k >= 1, every divisor the scan tests is real: k = 1, the smallest allowed
value, makes every non-empty bucket qualify, which is exactly what the
definition demands of it.

The bounds keep the arithmetic tiny: at most 100 elements none larger than
100 cap the answer at 100 * 100 = 10000, comfortably inside 32-bit signed
range, while the counter array holds a fixed 101 slots regardless of the
input size.

**Complexity:** `O(n)` time, `O(1)` space.
