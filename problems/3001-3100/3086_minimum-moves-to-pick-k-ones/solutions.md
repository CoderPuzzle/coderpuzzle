# Solutions — Minimum Moves to Pick K Ones

## Median window gathering with ternary search

Alice should stand still: a real one reaches her through adjacent swaps at one move per step of distance, and a manufactured one costs exactly two moves — one change to set a cell next to her, one swap to bring it onto her index. If she gathers `t` real ones, the cheapest `t` are a window of `t` consecutive ones among the `m` one positions, because skipping an in-between one while dragging a farther one past it can never help; and for a fixed window the total swap cost, the sum of distances, is minimized by standing at the window's median.

`window_cost(t)` scans every window of `t` consecutive one positions in O(1) each using prefix sums of the positions: the cost of pulling the left half up and the right half down to the median is an arithmetic expression in `prefix` differences. Then `total(t) = window_cost(t) + 2 * (k - t)` leaves the remaining `k - t` ones to the change operations. The feasible range is `t in [max(0, k - maxChanges), min(k, m)]` since at most `maxChanges` ones can be manufactured.

`total(t)` is convex over this range — the minimum-gathering cost is convex in the window size and the second term is linear — so ternary search shrinks the interval until it is a few candidates wide, and the survivors are evaluated directly. Edge cases fall out naturally: `t = 0` gives the all-manufactured cost `2k`, windows larger than `m` are infeasible (infinite), and the guaranteed `maxChanges + sum(nums) >= k` keeps the range nonempty.

**Complexity:** `O(n + m log m)` time, `O(m)` space.
