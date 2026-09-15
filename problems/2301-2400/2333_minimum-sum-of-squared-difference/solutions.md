# Solutions — Minimum Sum of Squared Difference

## Level buckets spent largest-first

Each operation moves one difference by one unit in whichever direction we
choose — a +1 on nums1[i] and a -1 on nums2[i] both lower d[i] =
nums1[i] - nums2[i] — so k1 and k2 pool into one budget spent on absolute
differences, and only |d| matters.

Lowering an entry from |d| = v to v - 1 always removes 2v - 1 from the sum,
more the larger v is, so a currently largest entry should absorb every
operation, and no entry is ever worth pushing past zero (|d| would grow
again). Simulate in bulk with one count per level: sweep levels downward,
move whole buckets one level while the budget covers them, and split the
bucket it does not cover.

**Complexity:** `O(n + V)` time and `O(V)` space, `V` the largest absolute difference.
