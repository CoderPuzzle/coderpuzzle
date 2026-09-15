# Solutions — Count Numbers With Unique Digits II

## Straight scan with a digit mask

The range holds at most `1000` numbers, so the honest approach is to walk
every value from `a` through `b` and test it directly: peel digits off the
value one by one, setting a bit per digit in a small mask, and reject the
value the moment a digit lands on an already-set bit. Single-digit numbers
pass trivially, and a value with all-distinct digits ends with exactly its
own digits' bits set.

The work per number is constant because values within the bounds have at
most four digits — and the only four-digit value, `1000`, fails immediately
on its repeated zeros. So the scan costs time proportional to the range size
times the per-value digit count, and constant extra space beyond the counter
and the mask.

**Complexity:** `O((b - a + 1) * d)` time, `O(1)` space, with `d` the digit
count of the largest value in the range.
