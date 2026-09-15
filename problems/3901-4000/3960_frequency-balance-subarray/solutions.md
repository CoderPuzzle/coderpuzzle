# Solutions — Frequency Balance Subarray

## Frequency-level moments

Fix the left endpoint and extend the right endpoint one position at a time.
Besides each value's frequency, maintain how many values currently have each
positive frequency. This makes every window update constant time.

Track the number, sum, and squared sum of the active frequency levels. A
multi-value window is balanced exactly when there are two active levels whose
sum is `3f` and whose squared sum is `5f²`; those equations characterize the
levels `f` and `2f`. A window with one distinct value is accepted separately.

**Complexity:** `O(n²)` time, `O(n)` space.
