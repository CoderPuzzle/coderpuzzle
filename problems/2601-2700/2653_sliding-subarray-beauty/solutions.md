# Solutions — Sliding Subarray Beauty

## Sliding Frequency Table

Only negative values can ever be a beauty: when a window holds fewer
than x negatives the answer is defined to be 0, so positive values and
zeros contribute nothing except occupying space. Every element is bounded
to [-50, 50], which caps the distinct negative values at just fifty. That
fixed alphabet is what makes an exact per-window answer cheap without any
ordered structure over window contents.

The code keeps cnt, one bucket per possible negative value from -50 up to
-1, and slides a window of size k across nums, incrementing on arrival
and decrementing on departure. When the front of a new window settles at
index i >= k - 1, it walks the buckets smallest value first, summing
counts until at least x negatives have accumulated; the value whose
bucket crosses the threshold is that window's beauty. If the sweep falls
off the end of the buckets, fewer than x negatives are present and the
beauty is 0. Each slide touches one entering and one leaving element and
walks at most fifty buckets, so no sorting or ordered-map machinery is
ever needed for windows whose contents change only by one element.

Widening: every answer lies in [-50, 0], comfortably inside 32-bit range
in all seven languages, and each bucket count is at most k <= n <= 10⁵,
also far below any overflow bound — JavaScript numbers stay exact since
nothing here approaches 2⁵³.

**Complexity:** `O(n · V)` time and `O(V)` space, where `V` is the size
of the negative value range — at most fifty, so effectively linear in n.
