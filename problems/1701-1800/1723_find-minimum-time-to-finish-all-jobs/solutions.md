# Solutions — Find Minimum Time to Finish All Jobs

Both answers lean on the same smallness: twelve jobs at most means at most
`2^n` distinct sets of them, so the assignment question can be carried by
named sets rather than sequences. The pruned search never names them — it
dives through the tree of placements and lets its cuts decide how much of
the tree gets walked, so its speed is a practical fact, not a promise. The
subset table pays up front instead: every set of served jobs, for every
count of workers, gets one exact entry, and the optimum is read off a
finished table whose cost was fixed before the first job was seen.

## Pruned Backtracking (Branch and Bound)

With at most 12 jobs, the assignment space `k^n` is small enough to search exhaustively provided aggressive pruning. The solution assigns jobs one at a time in a depth-first search, tracking the per-worker loads in a single array, and carries the best maximum load found so far in `best`, initialized pessimistically to `sum(jobs)`. When all jobs are placed, the candidate answer is `max(loads)`; every complete assignment is a legal one, so the search returns the true optimum once it finishes.

Three prunings make it fast. Jobs are sorted in descending order first, so the largest loads appear at the shallowest levels where the bound tightens soonest. A branch is abandoned as soon as it cannot improve: if `loads[w] + jobs[i] >= best`, placing job `i` on worker `w` is pointless. Symmetry is cut two ways — a `seen` set skips workers whose current load was already tried for this job (identical subproblems), and after trying a job on an empty worker the loop breaks, because all remaining empty workers are interchangeable.

These prunings never remove a branch that could contain a strictly better assignment: they only drop branches whose lower bound already reaches `best` or that duplicate, state-for-state, a branch explored earlier. The worst case remains exponential in `n`, but with `n <= 12` and the descending order plus symmetry cuts, the practical search tree is far smaller. Space is just the load array, the `seen` set per level, and the recursion stack of depth `n`; the stated time bound is the pruned worst case.

**Complexity:** `O(k^n)` time, `O(n + k)` space.

## Bitmask Subset DP

Name each set of jobs by a bitmask and the assignment question becomes a
table. `dp[i][mask]` is the lightest maximum load achievable when the jobs in
`mask` have been handed to `i` workers. The first row is the subset-sum table
`sums[mask]` itself — one worker leaves nothing to choose — built by peeling
off one lowest-numbered job at a time. Placing the next worker means deciding
what that newcomer carries: for every submask `sub` of `mask`, the newcomer
takes `sub` while the workers already placed must cover `mask ^ sub`, and the
worse side of the pair is the finished assignment's maximum, so
`dp[i][mask] = min over sub of max(dp[i-1][mask ^ sub], sums[sub])`.

Enumerating every subset of every mask is the classic `3^n` sweep — each of
the `n` bits sits in the mask, in the submask, or in neither. One ordering
cut applies: workers are interchangeable, so the worker being placed may be
required to take the lowest-numbered job still present in `mask`; only
submasks holding that bit are distinct choices, which halves the sweep
without discarding any partition — whichever worker took that job can simply
be renamed the newcomer. Two rows are alive at a time (`prev` and `cur`)
alongside the sum table, and `prev[full]` after the last pass is the answer,
since another worker never raises the achievable maximum.

The contrast with the search above is the point: nothing here reacts to the
data. The `k - 1` passes run unconditionally over the same fixed sweep, so
the step count is a guarantee rather than an observation, and the worst case
is exactly as tame as the best one.

**Complexity:** `O(3^n · k)` time, `O(2^n)` space.
