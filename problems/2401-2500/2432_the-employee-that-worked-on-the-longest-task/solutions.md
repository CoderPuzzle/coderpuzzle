# Solutions — The Employee That Worked on the Longest Task

## One pass tracking the best task

The task start times are implicit: task 0 starts at 0 and every later task
starts the moment the previous one ends, so the duration of the ith task is
`logs[i][1] - logs[i - 1][1]` (with `logs[-1][1]` read as 0). A single pass
over `logs` can therefore compute every duration on the fly while keeping
only the best result seen so far — the longest duration and the employee
who produced it.

A candidate replaces the best when its duration is strictly longer, or when
it ties the current best but the employee has a smaller id (the tie rule).
Because the pass goes left to right, earlier tasks are naturally preferred
on ties only when their ids are smaller, which is exactly the required
behavior. The `n` parameter is not needed to compute the answer — the logs
already contain every employee id that appears — so it is ignored.

This touches each log exactly once and stores only two running values, so it
is both simpler and cheaper than collecting all durations (or a hash table
of per-employee longest tasks) before comparing.

**Complexity:** `O(m)` time, `O(1)` space, where `m` is the number of logs.
