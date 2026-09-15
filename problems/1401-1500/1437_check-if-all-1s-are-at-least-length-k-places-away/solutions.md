# Solutions — Check If All 1's Are at Least Length K Places Away

## Track the previous one

Only consecutive `1`'s matter: a violation exists exactly when some pair
of neighboring ones (neighboring among the ones, zeros in between
ignored) sits closer than `k + 1` indices apart. So one scan suffices,
holding the index of the last `1` seen.

Starting with the previous index unset, each `1` either sets it for the
first time or is checked against it — `index - previous > k` must hold,
i.e. at least `k` zeros lie strictly between them — and then becomes the
new previous. The scan returns `false` at the first violation and `true`
if it finishes clean. An array with zero or one `1` never fails, which
the initialization handles for free.

The alternative of collecting all one-positions into a list and checking
adjacent gaps is the same algorithm with an intermediate array; the
running-previous form keeps the space at two scalars. At `10⁵` elements
the scan is a single pass with no allocation.

**Complexity:** `O(n)` time, `O(1)` space.
