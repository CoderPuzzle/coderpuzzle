# Solutions — Partition Array Into K-Distinct Groups

## Frequency ceiling

Two arithmetic facts decide the answer. First, groups all have exactly `k`
elements, so `n` must be divisible by `k` — if the division leaves a
remainder, some group would come up short, and the answer is `false` before
anything else needs checking. Second, let `m = n / k` be the number of
groups. A value never shares a group with itself, so every occurrence of a
value consumes a different group; if any value occurs more than `m` times,
there are not enough groups to absorb its copies and the answer is `false`.

Those two conditions are also sufficient. Line up all elements grouped by
value — each distinct value forms one contiguous run of at most `m` copies —
and deal them into the `m` groups round-robin, one element per group in
turn. Consecutive positions cycle through all `m` groups, so a run of length
at most `m` lands in `m` distinct groups: no group ever receives the same
value twice. And because the total is exactly `m · k`, every group ends up
with exactly `k` elements. The deal witnesses that any frequency profile
respecting the ceiling can be realized.

So the algorithm is a single counting pass over `nums`, then two constant-
time checks: `n % k == 0` and the maximum frequency at most `n / k`. No
group ever has to be materialized.

**Complexity:** `O(n)` time, `O(n)` space.
