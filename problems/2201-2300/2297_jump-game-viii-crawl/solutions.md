# Solutions — Jump Game VIII

## Nearest-target stacks, left-to-right relaxation

Each jump rule admits exactly one target from an index. Rule A reaches the nearest later index whose value is at least `nums[i]` — any farther candidate would have that index as an intermediate, and it is not strictly below `nums[i]`. Rule B symmetrically reaches the nearest later index whose value is below `nums[i]`. So every index has at most two outgoing edges, and since a jump always moves rightward, the graph is a DAG whose index order is a topological order.

Two monotonic stacks recover both targets in a single backward sweep: popping entries with values below `nums[i]` exposes the nearest at-least-`nums[i]` index to the right, and popping entries with values at or above `nums[i]` exposes the nearest below-it index. A forward pass over the indices then computes shortest paths exactly: when `left` is reached its cost is final (every predecessor lies earlier), so relaxing `dp[right] = min(dp[right], dp[left] + costs[right])` for each of its targets settles `right` in turn. The start costs nothing; each landing pays its own `costs[right]`.

Total costs reach the sum of all `costs[i]`, about 10¹⁰, which overflows 32-bit integers — fixed-width languages accumulate in 64-bit, while JavaScript stays well under 2⁵³.

**Complexity:** `O(n)` time, `O(n)` space.
