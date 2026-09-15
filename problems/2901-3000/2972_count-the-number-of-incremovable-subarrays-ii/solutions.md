# Solutions — Count the Number of Incremovable Subarrays II

Removing one subarray leaves a prefix and a suffix, and the result is
strictly increasing exactly when both halves rise and the prefix's last
element sits below the suffix's first. Counting removals by what they
keep turns the n ≤ 10⁵ version of this problem into a linear sweep.

## Sweep the seam between the increasing ends

Let x end the maximal strictly increasing prefix and y start the maximal
strictly increasing suffix. Every valid removal keeps a prefix nums[:p]
with p ≤ x + 1 and a suffix nums[s:] that is strictly increasing (so
s ≥ y), starts above the seam (nums[p − 1] < nums[s]), and satisfies
s ≥ p + 1 so the removed range is non-empty. For a fixed p, every suffix
starting at s or later qualifies once nums[s] does, contributing
n − s + 1 removals. Because the kept prefix's last value nums[p − 1]
strictly grows with p inside the maximal prefix, the smallest valid s
never moves left — one shared pointer walks the suffix at most n steps
across all p. The strictly increasing array maximizes the count at
n(n + 1)/2 = 5,000,050,000, which overflows 32 bits: 64-bit accumulators
are required, while the value stays far below 2⁵³ so JavaScript numbers
remain exact.

**Complexity:** `O(n)` time, `O(1)` space.
