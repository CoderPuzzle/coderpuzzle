# Solutions — Minimum Number of Operations to Make Array Empty

## Group by value and pay ceil(count / 3)

Each operation deletes two or three copies of a single value and touches
nothing else, so values never interact — the only thing that matters about
the array is how many times each value occurs. A value occurring exactly
once can never be deleted, because the smallest operation already needs two
equal copies, so the moment any frequency equals 1 the array cannot be
emptied and the answer is -1.

For a value whose count c is at least 2, each operation removes at most
three copies of it, so at least ceil(c / 3) operations are needed; and
ceil(c / 3) always suffices. If c is already a multiple of 3, take c / 3
triples. If the remainder is 2, take (c - 2) / 3 triples plus one pair. If
the remainder is 1, then c >= 4 and the plan is (c - 4) / 3 triples plus
two pairs — shrinking one triple into two pairs absorbs the leftover —
which again totals (c + 2) / 3 operations. Summing this per-value minimum
over all values therefore yields the global minimum, computed in one
counting pass. The answer never exceeds n / 2 = 50000, comfortably inside
a signed 32-bit integer.

**Complexity:** `O(n)` time, `O(n)` space.
