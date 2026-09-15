# Solutions

Two facts drive every approach. First, sorting the houses never hurts: an
optimal assignment gives each mailbox a contiguous run of houses in sorted
order. Second, one mailbox serving a fixed run belongs at the median of
that run. Approaches differ in how eagerly they precompute run costs; the
presented one caches them on demand inside the DP, which avoids filling
the whole `O(n²)` cost table when `k` is large.

## Partition DP With Median Run Costs

Sort the houses. Let `cost(i, j)` be the total distance if one mailbox
serves houses `i..j`: with the mailbox at the median house, it is the sum
of `houses[j] - houses[m]` mirrored pairs around the middle — computable
in a two-pointer walk without building prefix sums. Define `dp(i, b)` as
the minimum cost of covering houses `i..n-1` with `b` mailboxes; either
house `i`'s run extends to some `j` (paying `cost(i, j)`, moving to
`dp(j + 1, b - 1)`) or, once `b` exceeds the remaining house count, the
rest is free (one mailbox per house costs nothing). Memoized recursion
evaluates each state once over `O(n)` transitions.

**Complexity:** `O(n² · k)` time, `O(n · k)` space.
