# Solutions — Minimum Number of Operations to Reinitialize a Permutation

One fixed shuffle, applied over and over: every operation permutes the
array by the same rule, so the answer is the order of that shuffle -- how
many times it must run before the initial permutation reappears.

## The orbit of index 1

Read the rule as movement rather than assignment: even slot `2j` is filled
from old `j`, odd slot `2j + 1` from old `n / 2 + j`, so the entry at old
position `p` lands at `2p` when `2p < n` and at `2p - n + 1` otherwise,
with `0` and `n - 1` pinned in place. For the mobile indices
`1 <= p <= n - 2` the landing slot is exactly `2p mod (n - 1)`, so after
`k` operations each of them sits at `2^k * p mod (n - 1)`: the whole
permutation is initial again precisely when `2^k == 1 (mod n - 1)`, which
is exactly the condition for index `1` -- a unit modulo `n - 1` -- to be
home. Chasing index `1` through the piecewise map and counting steps until
it returns therefore measures the shuffle's order directly, and the
piecewise form needs no special case: at `n = 2`, index `1` is the pinned
endpoint `n - 1`, so the single operation the crawl's first example counts
is what the loop reports.

The chase is a flat counter. At most `n - 2` rounds run, since the order of
`2` modulo `n - 1` divides `phi(n - 1) <= n - 2`; the domain maximum of
`946` is reached at `n = 948`, while the `n = 1000` ceiling needs only
`36`. Every intermediate value stays below `2n <= 2000`, so 32-bit
integers are honest in every language (and exact small doubles in the JS
runtimes), and the loop is iterative -- nothing deeper than a counter and
an index is ever in scope.

**Complexity:** `O(n)` time, `O(1)` space.
