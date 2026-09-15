# Solutions — Time Needed to Inform All Employees

## Approach: Iterative upward accumulation from every employee

The news reaches employee `i` at time `T(i) = T(manager[i]) + informTime[manager[i]]`,
and the answer is the maximum `T` over all employees — the deepest
accumulation along any root-to-leaf chain. Rather than building child lists,
walk each employee's manager chain upward with an explicit stack, memoizing a
known arrival time for every employee already resolved: when a chain hits an
employee whose time is known (or the head), unwind back down adding each
manager's own inform time. Every employee is resolved once, so total work is
linear despite per-chain walking.

**Complexity:** `O(n)` time and space for `n` employees.
