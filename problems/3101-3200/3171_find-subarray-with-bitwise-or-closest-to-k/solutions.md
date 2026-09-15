# Solutions — Find Subarray With Bitwise OR Closest to K

## Suffix OR set of bounded size

For a fixed right end, the ORs of all subarrays ending there form the set {v} ∪ {prev | v : prev in the previous set}, because extending a subarray one step left ORs in one more element. The crucial observation is that OR never clears bits, so as the left end moves left the values only grow and nest — each distinct value must set at least one new bit, and values fit in 30 bits, so the set never exceeds about 31 elements no matter how long the array is.

The code carries that set forward in `current` and rebuilds it each step from the singleton {value} plus the OR of every previous entry with value. Against every entry it updates the running best |x - k|, which is initialized from the first element alone so single-element subarrays are covered. Duplicate OR values collapse harmlessly into the set.

The empty-set seed {0} at the start only feeds the first element's build (0 | v = v), so every subarray OR is examined at least once and the minimum difference is exact. With values below 2³⁰ the per-step work is at most 31 set operations, which turns a quadratic enumeration of subarrays into a linear scan with a tiny frontier.

**Complexity:** `O(n log U)` time (U = 2³⁰, the value bound), `O(log U)` space.
