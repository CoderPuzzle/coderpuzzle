# Solutions — Check If a Number Is Majority Element in a Sorted Array

## Two binary searches bracket the target's run

A sorted array holds equal values contiguously, so the count of `target` is
the span between its first and last positions. Two boundary searches find
those positions: `lower_bound` (the first index with a value >= target) and
`upper_bound` (the first index with a value > target). Their difference is
the number of occurrences — an absent target gives a zero-length span, so
that case needs no special handling.

The majority test is `count > n / 2` with integer division, matching the
statement's rule: 2 occurrences in a 4-element array fail (2 > 2 is false),
3 in a 5-element array pass. Doubling the count instead — `2 * count > n` —
expresses the same comparison without any division.

Each search is `O(log n)`, and nothing else touches the array.

**Complexity:** `O(log n)` time — two binary searches — and `O(1)` space.
