# Solutions — Minimum Adjacent Swaps to Reach the Kth Smallest Number

Two independent facts compose the solution. First, the kth smallest
wonderful integer is exactly k applications of next permutation to the
digit array. Second, the cheapest way to turn `num` into a digit-multiset
equal target with adjacent swaps is to keep equal digits in their
original relative order (any crossing of two equal digits can be undone
without cost), which reduces the whole question to counting inversions of
that order-preserving assignment.

## Next permutation k times, then count inversions

Advance the digits through next permutation `k` times: find the rightmost
ascent, swap it with the smallest larger digit to its right, and reverse
the suffix — each step is linear. Then assign every target digit the next
unused original index carrying that digit (queues per digit value,
consumed left to right), producing a permutation of original indices.
The minimum number of adjacent swaps to realize that arrangement equals
its inversion count, counted with a Fenwick tree: each index, processed
in target order, contributes however many already-placed indices sit
after it.

Both passes are linear or log-linear, and `k <= 1000` keeps the
permutation loop cheap even at the 1000-digit ceiling.

**Complexity:** `O(k·n + n log n)` time, `O(n)` space.
