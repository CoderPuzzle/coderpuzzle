# Solutions — Minimum Swaps to Avoid Forbidden Values

## Bad-cluster counting

Call an index bad when nums[i] equals forbidden[i]. Feasibility is a pure
counting question: a value v that occurs c_n times in nums and c_f times
in forbidden can only occupy slots that do not forbid it, and there are
n - c_f of those, so any value with c_n + c_f > n makes the task
impossible and the answer is -1. When no value overflows that bound the
task is always solvable, and the swap count collapses onto two lower
bounds that meet.

A swap touches two positions, so it repairs at most two bad indices —
the answer is at least ceil(B/2) for B bad indices. And two bad indices
sharing their value cannot repair each other: swapping them just trades
the two equal values, leaving both bad. Every swap therefore repairs at
most one member of any single value's bad cluster, so the answer is also
at least M, the largest cluster. Both bounds are achievable together:
pair bad indices of distinct values (one swap repairs both) while two
clusters remain, then repair each leftover member of the surviving value
v with one swap against a donor slot whose value and forbidden value
both differ from v — donors number n - c_n - c_f + b_v, which
feasibility keeps at least b_v. The pairing stage uses ceil(B/2) swaps
when no cluster dominates, and the donor stage lands the total on M
when one does, so the answer is max(ceil(B/2), M).

Two hash-map passes realize the formula: one folds nums and forbidden
into a combined frequency map for the feasibility test, the other counts
bad indices per value. Everything stays small — counts are at most 2n
and the answer at most n - so 32-bit integers suffice throughout.

**Complexity:** `O(n)` time, `O(n)` space.
