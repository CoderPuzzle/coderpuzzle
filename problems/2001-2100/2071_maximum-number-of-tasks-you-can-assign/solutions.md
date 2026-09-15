# Solutions — Maximum Number of Tasks You Can Assign

## Binary search with a task deque

Sort both arrays and binary-search the number `k` of assignable tasks. A feasibility check only needs the `k` easiest tasks and `k` strongest workers. Process those workers from weakest to strongest, adding every task the current worker could complete with a pill to a deque in requirement order.

If the deque's easiest task is within the worker's natural strength, assign it without a pill. Otherwise, spend a pill on the hardest eligible task; saving easier work for later workers cannot hurt. An empty deque or exhausted pill supply makes `k` infeasible, and feasibility is monotone in `k`.

**Complexity:** `O(n log n + m log m + K log K)` time and `O(K)` space, where `K = min(n, m)`.
