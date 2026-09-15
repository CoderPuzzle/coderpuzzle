# Solutions — Jump Game VIII

## Monotonic Stack Jump Graph + DAG DP

The key observation is that from any index `i` there are at most two possible jump targets: the first later index `j` with `nums[j] >= nums[i]` (reachable because every value strictly between is `< nums[i]`), and the first later index `j` with `nums[j] < nums[i]` (reachable because every value in between is `>= nums[i]`). Any longer jump would have to pass over one of these two "first" indexes, and that intermediate index violates the corresponding condition. So the whole jump graph has at most `2n` edges and, since jumps only go forward, it is a DAG.

Both "first later index" tables are built in one left-to-right pass each with a monotonic stack. For `next_ge`, pop every stacked index whose value is `<= nums[i]` — index `i` is exactly its first greater-or-equal successor. For `next_sm`, pop every stacked index whose value is `> nums[i]` — index `i` is its first strictly-smaller successor. Anything still on the stack has no valid target of that kind and keeps the sentinel `-1`.

With the edges known, run shortest-path DP over the DAG in increasing index order: `dp[i]` is the minimum cost of landing on `i`, starting from `dp[0] = 0`. For each `i < n - 1`, relax both outgoing edges by offering `dp[i] + costs[j]` to `dp[next_ge[i]]` and `dp[next_sm[i]]`. Because every edge points to a strictly larger index, one forward sweep visits every node after all of its predecessors, so no priority queue is needed. `dp[n - 1]` is the answer; edge cases such as plateaus (`nums[i] == nums[j]`) are handled naturally because the equality is folded into the first stack (`>=` pops) while the second stack uses strict `<`, matching the two jump conditions. A missing target (`-1`) is simply skipped, and with `n >= 1` index `n - 1` is always reachable along at least one chain.

**Complexity:** `O(n)` time, `O(n)` space.
