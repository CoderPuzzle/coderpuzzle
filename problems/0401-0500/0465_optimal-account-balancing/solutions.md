# Solutions — Optimal Account Balancing

## Bitmask DP on Zero-Sum Groups

The transactions themselves are irrelevant once each person's net balance is computed — `balance[p]` is what person p must pay (negative) or receive (positive). Only the nonzero balances matter: each such person must be involved in at least one settlement transaction, and people with zero net owe nothing, so the problem reduces to partitioning the nonzero balances into groups and settling each group internally.

Within any group of s people whose balances sum to zero, `s - 1` transactions always suffice and are necessary — a connected settlement needs at least s - 1 transfers, and a chain (each person settles with the next) achieves it. Maximizing the number of groups therefore minimizes the total: with n nonzero balances split into g zero-sum groups, the answer is `n - g`.

The code solves this with a bitmask DP over the set of nonzero balances (n is small — at most one balance per person, and person IDs are below 12). A first pass fills `sums[mask]` incrementally via the lowest set bit, marking `valid[mask]` when the subset's balances total zero — a candidate group. Then `dp[mask]` computes the maximum number of disjoint valid groups partitioning `mask`, by enumerating every submask `sub` of `mask` with `valid[sub]` and taking `dp[mask ^ sub] + 1`; the sentinel `-(10^9)` marks unreachable partitions so only exact partitions count. The answer is `n - dp[full]`.

Enumerating submasks of every mask costs `sum over masks of 2^popcount(mask) = 3^n` total, which is small at these constraints. The edge cases are structural: when every balance nets to zero, `n` is 0 and the function returns 0 with no transactions, and a single nonzero balance cannot occur since balances always sum to zero overall.

**Complexity:** `O(3^n)` time, `O(2^n)` space, where n is the number of nonzero net balances.
