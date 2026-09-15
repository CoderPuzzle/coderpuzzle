# Solutions — Maximum Unique Subarray Sum After Deletion

Deletions cost nothing and only have to leave the array non-empty, so the
contiguity of the final subarray is an illusion: delete everything
between any two kept positions and they become adjacent. The real choice
is which set of distinct values to keep.

## Keep every distinct positive value once

Since the kept elements must be pairwise distinct and their sum maximal,
each positive value in the array contributes its full worth the first
time it is kept and nothing further on later copies, while any negative
value only drags the sum down — deleting it is always free. Zeros are
neutral: including one changes neither distinctness nor the sum. So one
scan with a `seen` set accumulates every strictly positive value the
first time it appears.

The only case the scan cannot answer is when no positive value exists at
all: then the empty set is forbidden (deletions may not empty the array),
and the best single-element set is the maximum element — which is
negative or zero. The scan tracks `largest` alongside so both answers
come out of one pass; `seen` being empty is exactly the trigger for the
fallback. Every value sits in `[-100, 100]` and the answer's magnitude
is at most `1 + 2 + … + 100 = 5050`, far inside every integer width.

**Complexity:** `O(n)` time, `O(n)` space.
