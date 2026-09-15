# Solutions — Increasing Triplet Subsequence

An ascending triple is decided by its middle element: some position `j`
works exactly when a smaller value sits strictly before it and a larger
value sits strictly after it. Both approaches check that condition, and
they differ in how the two sides are found. The prefix-minimum and
suffix-maximum arrays precompute them outright — one forward sweep fills
`leftMin` with the running minimum of everything left of each position,
one backward sweep fills `rightMax` symmetrically, and a final pass tests
each position in turn. The greedy folds the left side into two numbers
that a single sweep carries — the smallest value seen so far and the
smallest value with a smaller predecessor — answering in `O(1)` space
where the arrays spend `O(n)`.

## Prefix Minimum and Suffix Maximum

Whether a position can serve as an ascending triple's middle element
depends only on its neighborhood: some value strictly before it must be
smaller, and some value strictly after it must be larger. Both facts are
mechanical to precompute, so the arrays make the middle-element test
direct. One forward sweep fills `leftMin`, where `leftMin[j]` is the
smallest of the values before `j` — each entry extends the previous
minimum by one more value — and a backward sweep fills `rightMax`
symmetrically with the largest of the values after `j`. A final pass then
reports success at the first position satisfying
`leftMin[j] < nums[j] < rightMax[j]`.

The equivalence is two-sided. If an ascending triple exists anywhere, its
own middle element satisfies the check, so the pass finds a witness.
Conversely, a position passing the check exhibits a smaller earlier value
and a larger later one, which is already a triple. The two ends of the
array have no outer neighbor, so they are seeded with sentinels —
`leftMin[0]` with positive infinity and `rightMax[n - 1]` with negative
infinity — that can never satisfy the strict comparisons, and arrays
shorter than three elements return `false` before any sweep.

**Complexity:** `O(n)` time, `O(n)` space.

## Track the two smallest ascending candidates

Only a yes/no answer is needed, so nothing has to be remembered beyond
two numbers: `first`, the smallest value seen so far, and `second`, the
smallest value that already has a strictly smaller predecessor. Scanning
left to right, a value that does not beat `first` replaces it; one that
beats `first` but not `second` replaces `second`; and one that beats both
completes an ascending triple — its predecessor chain exists by
construction.

The subtle case is a new minimum arriving after `second` is set: it
updates `first` alone, which can only help later values, because
`second`'s guarantee — some smaller earlier element exists — is never
weakened by shrinking `first`.

**Complexity:** `O(n)` time, `O(1)` space.
