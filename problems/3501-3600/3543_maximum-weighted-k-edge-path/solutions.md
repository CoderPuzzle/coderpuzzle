# Solutions — Maximum Weighted K-Edge Path

## Layered bitset DP over exact path sums

Every candidate path has exactly k edges and a total weight strictly below
t, so the search space is the set of (edges used, endpoint, total) triples
with total < t. That state space is small — at most 300 × 300 × 600 — and
each edge of the DAG extends a state by exactly one deterministic amount,
which makes a layered dynamic program over exact path sums the natural
fit: after j rounds we know every total reachable by a j-edge path ending
at each node.

Each node keeps a bitset over sums 0 .. t - 1 (every weight is ≥ 1, so a
total below t can only be built from prefixes below t — masking sums at t
mid-sweep never discards a valid path). Round j + 1 is one sweep of the
edge list: node v inherits `(dp[u] << w)` for every edge u → v of weight
w, i.e. each j-edge total s at u becomes the (j+1)-edge total s + w at v,
clipped to the t-bit window. Layer j = 0 seeds the empty path — sum 0 at
every node — which is what makes k = 0 answer 0. After k rounds the answer
is the highest set bit over all nodes, or -1 if every mask is empty; a
path may end anywhere, so no fixed destination constrains the scan.

The bitsets are wide integers in the dynamically typed languages and
manual 64-bit word arrays (⌈t/64⌉ ≤ 10 words) elsewhere; either way a
round costs O(E · t/64) and the whole run O(k · E · t/64) — about 10⁶
word operations at the constraint maxima — with O(n · t/64) space for the
two live layers.

**Complexity:** `O(k · E · t/64)` time, `O(n · t/64)` space.
