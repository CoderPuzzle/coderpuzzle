# Solutions — Special Array II

## Special-suffix starts

A subarray is special exactly when it contains no same-parity pair, and
same-parity pairs are position-local facts: nums[s..t] is special iff the
longest special run ending at t begins at or before s. One linear pass
computes that start for every index — `reach[i]` extends `reach[i - 1]`
when `nums[i - 1], nums[i]` differ in parity, and collapses to `i` when
they do not. A query `[fromi, toi]` then reduces to a single comparison:
the subarray is special exactly when `reach[toi] <= fromi`, since any
break inside `[fromi..toi]` would push the suffix start past fromi.

Each query costs O(1) after the O(n) preprocessing pass, so the whole
work is linear in the input size regardless of how the query windows
overlap. The answers are collected in order into the boolean result
array.

**Complexity:** `O(n + m)` time, `O(n)` space (m = number of queries).
