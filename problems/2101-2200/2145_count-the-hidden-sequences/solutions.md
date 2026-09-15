# Solutions — Count the Hidden Sequences

## Measure the prefix-sum range

Set the first hidden value temporarily to zero and accumulate the differences. Record the minimum and maximum prefix values, including the initial zero; shifting the first value shifts every sequence element equally, so the required span `maximum - minimum` never changes.

The inclusive interval `[lower, upper]` has width `upper - lower`. A span of `range` can start in `upper - lower - range + 1` integer positions when that quantity is positive, otherwise none. Prefix sums use 64-bit arithmetic because they can reach `10¹⁰`, although the returned count is at most 200001 and fits int32.

**Complexity:** `O(n)` time and `O(1)` auxiliary space.
