# Solutions — Minimum Initial Energy to Finish Tasks

## Greedy Ordering by Slack

A task's slack is `minimum - actual`, the surplus energy it demands beyond what it consumes. Doing high-slack tasks first is optimal: starting energy only needs to cover the largest prefix requirement, and an early task with big slack "banks" the surplus it reserves for later, when the remaining budget is lower. Exchange arguments show that swapping an adjacent out-of-order pair (a smaller-slack task done before a larger-slack one) never increases the needed starting energy.

After sorting by slack descending, sweep once while tracking `spent`, the total actual energy consumed so far. Each task requires the current energy to be at least its `minimum`, so the running answer is the maximum of `spent + minimum` over the prefix; `spent` then grows by the task's `actual` cost. The final answer is the largest of these prefix requirements, and it is achievable by doing the tasks in exactly this order starting from that amount.

Sorting makes the pass `O(n log n)`; a stable ordering among equal slacks is irrelevant since the bound only depends on the multiset of prefix maxima. Tasks where `actual == minimum` simply contribute their full requirement, and a single task's answer is its `minimum`.

**Complexity:** `O(n log n)` time, `O(n)` space.
