# Solutions — Number of Distinct Averages

## Sort and pair extremes

Every round removes one current minimum and one current maximum. After
sorting, the i-th removal therefore always pairs the i-th smallest element
with the i-th largest, regardless of how ties at the extremes are broken:
the multiset of pairs `(sorted[i], sorted[n-1-i])` is the same no matter
which equal-valued min or max is picked. So the process reduces to a single
sort followed by `n / 2` fixed pairs.

The average `(a + b) / 2` is distinct exactly when the sum `a + b` is
distinct, since dividing by two is a bijection. Recording pair sums in a set
therefore counts distinct averages while avoiding floating-point values
entirely — no precision worry for the half-integer averages the examples
produce.

`nums[i]` is at most 100, so every pair sum lies in `[0, 200]` and the set
has at most 201 entries. The sort dominates the cost.

**Complexity:** `O(n log n)` time, `O(n)` space.
