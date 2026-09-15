# Solutions — Find Lucky Integer in an Array

## Descending scan over a bounded tally

Every element sits in `1..500`, so frequencies fit in a 501-slot array — no hash map needed. One pass tallies the occurrences; a second pass walks the slots from 500 down to 1 and returns the first value whose tally equals the value itself, which is by construction the largest lucky integer.

Walking downward is what makes "largest" free: the first lucky value met is the answer. If the scan falls through to 1 without a match, no lucky integer exists and `-1` is returned.

Both passes are linear in the array length plus a constant 501 slots.

**Complexity:** `O(n)` time, `O(1)` extra space.
