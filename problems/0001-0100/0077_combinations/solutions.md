# Solutions — Combinations

## Backtracking over increasing start values

A combination is fully determined by which `k` of the numbers `1..n` it contains — the order inside it does not matter, since `[1,2]` and `[2,1]` are the same combination. Fixing that internal order to ascending turns the answer into a choice of an increasing sequence, which a depth-first walk over a shared `current` buffer produces directly: at each depth it tries every value from a `start` floor up to `n`, recursing with the floor moved past the value just chosen. Each root-to-leaf path is one combination, every combination appears exactly once, and because candidates are tried in ascending order and always grow, the walk emits each combination ascending and the whole list in the ascending lexicographic order the statement pins — no post-sort of the output is needed.

The loop's upper bound is the walk's only pruning: a value larger than `n - remaining + 1` (where `remaining` counts the slots still to fill) would not leave enough bigger numbers to complete the buffer, so those dead branches are never entered and every leaf reached has exactly `k` numbers. The buffer is copied into the results only at a leaf, since it is shared by all branches on the way back up.

The tree has `C(n, k)` leaves and each is copied once when it is complete. The bound matters most in the middle of the range, where `C(n, k)` peaks: the largest output the cases exercise is `C(13, 6) = 1716` combinations, sized to the judge's output budget rather than the constraint ceiling.

**Complexity:** `O(k · C(n, k))` time, `O(k)` auxiliary space excluding the output.
