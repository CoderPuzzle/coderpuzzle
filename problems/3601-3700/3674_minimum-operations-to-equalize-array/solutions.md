# Solutions — Minimum Operations to Equalize Array

## One whole-array AND at most

The answer never needs to climb past 1. Applying the operation once to the
subarray spanning the entire array replaces every element with `nums[0] &
nums[1] & ... & nums[n - 1]`, and an array whose elements are all the same
value is equalized regardless of what that value turned out to be — even if
the AND landed below every original element, as it does whenever two
elements disagree on a bit where both are otherwise set.

So the only real question is whether zero operations already leave the
array uniform, and that is a single linear scan: compare each element
against the first, answer 0 when nothing differs and 1 at the first
mismatch. The AND value itself never has to be computed; the scan stops as
soon as any unequal pair shows up.

**Complexity:** `O(n)` time, `O(1)` space.
