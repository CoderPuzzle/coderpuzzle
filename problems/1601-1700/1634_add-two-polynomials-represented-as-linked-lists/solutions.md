# Solutions — Add Two Polynomials Represented as Linked Lists

## Two-pointer merge by power

Both `poly1` and `poly2` are already sorted in strictly descending order
by power, so adding them is the same merge step used to combine two
sorted lists: walk a pointer into each array, and at every step advance
whichever pointer currently points at the larger power, since that term
cannot possibly be matched later. Because this judge passes each
polynomial as a `[power, coefficient][]` array rather than the original
two-field linked list, "advancing a pointer" here just means moving an
index instead of following `next`.

When the two pointers sit on equal powers, the term only survives if the
two coefficients don't cancel: sum them, and append `[power, sum]` only
when `sum != 0`, then advance both pointers together. When the powers
differ, the pointer at the strictly larger power owns a term the other
list has nothing to contribute to for that power, so its `[power,
coefficient]` pair is copied straight into the result and only that
pointer advances. Once one array is exhausted, whatever remains of the
other is already in the correct descending order and is appended
wholesale.

**Complexity:** `O(n + m)` time, `O(n + m)` space, where `n` and `m` are
the lengths of `poly1` and `poly2`.
