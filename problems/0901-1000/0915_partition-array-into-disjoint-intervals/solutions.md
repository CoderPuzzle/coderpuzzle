# Solutions — Partition Array into Disjoint Intervals

## Prefix maximum against suffix minimum

A cut at position `i` — `left = nums[:i]`, `right = nums[i:]` — is valid
exactly when the largest element on the left does not exceed the smallest
element on the right: comparing those two extremes subsumes every
element-by-element comparison, so each candidate cut reduces to one number
from each side. Precompute `min_from[i]`, the minimum of the suffix
`nums[i:]`, in a right-to-left pass that folds each element into the
minimum behind it; then sweep left to right carrying `max_to`, the maximum
of everything already passed. The first `i` where `max_to <= min_from[i]`
is the answer: every earlier cut failed this same test, and this one passes
it, so the first hit is the smallest possible left.

Both rules of the statement fall out of the extremes test. Equality is
allowed across the cut, so ties are settled by `<=`: in `[6,3,6,9]` the
prefix maximum 6 and the suffix minimum 6 tie at `i = 2` and the cut is
legal, while in Example 2 the dip to 0 holds every early suffix minimum
below the prefix maximum 1 until the 6 finally clears it at `i = 4`. And
a single early spike can force a long left — with a boundary value of
10⁶ sitting at index 0, every suffix element must also be 10⁶ before any
cut is legal, which is why `[1000000,5,7,1000000,1000000]` answers 3. The
same blocking explains when the whole array is needed: `[5,4,3,2,6]`
answers 4 because no suffix minimum reaches 5 until the final 6.

The sweep starts at `i = 1`, so `right` is never empty, and the problem
guarantees a partition exists, so the sweep returns before the array ends.
Elements are only compared, never combined, so the constraint's 10⁶
extremes need no wider arithmetic.

**Complexity:** `O(n)` time, `O(n)` space.
