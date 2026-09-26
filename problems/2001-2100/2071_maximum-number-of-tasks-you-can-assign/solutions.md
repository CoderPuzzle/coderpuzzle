# Solutions — Maximum Number of Tasks You Can Assign

## Binary search with a task deque

Sort both arrays and binary-search the number `k` of assignable tasks. A feasibility check only needs the `k` easiest tasks and `k` strongest workers. Process those workers from weakest to strongest, adding every task the current worker could complete with a pill to a deque in requirement order.

If the deque's easiest task is within the worker's natural strength, assign it without a pill. Otherwise, spend a pill on the hardest eligible task; saving easier work for later workers cannot hurt. An empty deque or exhausted pill supply makes `k` infeasible, and feasibility is monotone in `k`.

![Example 1's k = 3 feasibility check on tasks [1, 2, 3] and workers [0, 3, 3]: worker 0 spends the only pill on deque task 1, then the two 3-strength workers assign tasks 2 and 3 naturally, so all three tasks complete.](figures/solution-task-deque-feasibility.svg)

**Complexity:** `O(n log n + m log m + K log K)` time and `O(K)` space, where `K = min(n, m)`.
