# Solutions — Combination Sum III

## Backtracking over the digits 1 through 9

A valid combination is just which `k` of the digits `1..9` it contains — the order inside it does not matter, since `[1,2,4]` and `[2,1,4]` are the same combination. Fixing that internal order to ascending turns the answer into a choice of an increasing digit sequence summing to `n`, which a depth-first walk over a shared `current` buffer produces directly: at each depth it tries every digit from a `start` floor up to 9, recursing with the floor moved past the digit just chosen. Each root-to-leaf path is one combination, every combination appears exactly once — the rising floor never revisits a digit, so each number is used at most once — and because digits are tried in ascending order and always grow, the walk emits each combination ascending and the whole list in the ascending lexicographic order the statement pins, with no post-sort of the output.

The loop's bounds are the walk's only pruning, one per constraint. A digit must leave `slots - 1` larger digits behind it, so it can never exceed `10 - slots`: the first digit of a `k = 3` combination is at most 7, and branches that could not be completed are never entered. And digits grow across the loop, so the first digit that overshoots the remaining budget ends it — every later digit is at least as large. A leaf with all `k` slots filled records its snapshot exactly when the remaining budget has hit zero, so only combinations summing to `n` are kept.

The domain is tiny by construction — `k` is at most 9, so the search tree has a few hundred nodes and the largest output the domain admits is 12 combinations (`k = 4, n = 20` and `k = 5, n = 25`) — far inside the judge's output budget.

**Complexity:** `O(k · C(9, k))` time, `O(k)` auxiliary space excluding the output.
