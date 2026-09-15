# Solutions — Earliest Second to Mark Indices II

## Binary search with a backward greedy feasibility check

Feasibility is monotone in the deadline — if all indices can be marked within `t` seconds, they can within any later second — so binary search the smallest feasible `t` over `[lo, m]`, returning -1 when even `m` fails. The natural unit of work is `sum(nums) + n`: `nums[i]` decrements plus one mark per index if nothing is ever set to zero. A "set to 0" operation at an index's occurrence second replaces all its decrements, and the check below decides greedily which ones to buy.

`check(t)` scans seconds from `t-1` down to 0. Only the first occurrence of an index with a positive `nums` value is a sensible second to set it to zero (later occurrences of the same index buy nothing extra); every other second is spare capacity, accumulated in a counter `cnt`. At each first occurrence, tentatively buy the set-to-zero: push `nums[idx]` onto a min-heap and reserve one spare second for that index's later mark (`cnt -= 1`). If no spare second is available, cancel the least profitable purchase so far — pop the heap minimum — handing that index back to decrement handling while freeing a second net (`cnt += 1`); scanning backwards guarantees every reserved mark second lies after its set second.

After the scan the heap holds exactly the zeroed indices, whose remaining cost is two seconds each, already paid for by their occurrence seconds and reserved marks. The residual work is the decrement-plus-mark cost of every non-zeroed index, `total - (sum(heap) + len(heap))`, and it fits iff it is at most the leftover spare seconds `cnt`. The search starts from a lower bound of one second per markable index (or `nums[i] + 1` for indices that never appear in `changeIndices` and thus cannot be zeroed) plus `n` marks, which prunes hopeless deadlines quickly.

**Complexity:** `O(m log m log n)` time, `O(n)` space.
