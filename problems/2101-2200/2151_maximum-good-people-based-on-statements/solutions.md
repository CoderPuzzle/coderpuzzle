# Solutions — Maximum Good People Based on Statements

## Bitmask Enumeration of Good Assignments

With `n ≤ 15`, all 2ⁿ assignments of "good" and "bad" to the people can be enumerated directly. A candidate assignment is encoded as a bitmask where bit `i` set means person `i` is good. The defining constraint is one-sided: good people always tell the truth, so every statement made by a good person must match the assignment; bad people's statements are unconstrained because they may lie or tell the truth.

For each mask, the solution collects the good people and checks each of their statements: a `1` (claims `j` is good) requires bit `j` set, a `0` (claims `j` is bad) requires it clear, and `2` (no statement) is ignored. If every good person's statements agree, the assignment is valid and the popcount of the mask — the number of good people — updates the answer. Statements `statements[i][i]` are guaranteed `2`, so self-statements never interfere.

The all-bad mask is trivially valid (no good speakers to contradict), so the answer is at least 0 and the search is exhaustive over every consistent hypothesis. The inner double loop over good people and columns is bounded by n² per mask. Only the per-mask good list is allocated beyond constants.

**Complexity:** `O(2ⁿ · n²)` time, `O(n)` space.
