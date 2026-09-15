# Solutions — Sum of Beauty in the Array

## Prefix maxima and suffix minima

The two-point condition at index `i` is equivalent to the maximum of every
strictly earlier value being less than `nums[i]` and `nums[i]` being less than
the minimum of every strictly later value. Precompute those two boundary arrays
so the global condition can be tested in constant time per interior index.

Build `prefix[i]` only from positions before `i` and `suffix[i]` only from
positions after `i`. During the final scan, award 2 when both global inequalities
are strict. Otherwise test the immediate neighbors for the 1-point condition;
testing it second preserves the stated priority when both conditions hold.

**Complexity:** `O(n)` time, `O(n)` space.
