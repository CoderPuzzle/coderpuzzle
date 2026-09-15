# Solutions — Find the Index of the Large Integer

## Divide and conquer

`compareSub` only compares two sub-arrays of the same length, but that is
still enough to halve the search range on every call: split the current
range into two equal-length halves and compare their sums. Every entry
outside the large one contributes the same value on both sides, so the
half containing the large entry sums strictly higher — recurse into
whichever half wins the comparison, and the range shrinks by half with
a single call.

An odd-length range cannot be split down the middle into two equal
halves, so peel off the middle element first and compare the equal-length
halves on either side of it. A `0` result means those two halves are
perfectly balanced, which can only happen when the peeled middle element
is the large one — return it on the spot. A nonzero result recurses into
the heavier side exactly as the even case does, now on a range one
element smaller. Either way, one call retires at least half of the
current range, so the range length only ever passes through a sequence
of roughly-halving sizes on the way down to a single element, where the
answer is immediate and no further call is needed.

Each call at least halves what remains, so the recursion depth — and
therefore the call count — grows with `log2` of the array length. Even
at the largest allowed length, `5 × 10⁵`, the search bottoms out in 18
calls, comfortably inside the 20-call budget.

**Complexity:** `O(log n)` calls to `compareSub`, `O(1)` additional
space (recursion depth `O(log n)`).
