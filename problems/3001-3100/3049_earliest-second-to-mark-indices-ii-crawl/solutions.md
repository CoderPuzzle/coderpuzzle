# Solutions — Earliest Second to Mark Indices II

## Binary search on the answer plus a deadline-cap greedy

Feasibility is monotone in the horizon: finishing within `t` seconds also
finishes within `t + 1`, so the answer is binary-searchable over `[1, m]`.
For a fixed horizon `t`, a set-op only pays when it zeroes an index whose
value is at least 2, and clearing an index at its **first** occurrence
within `[1, t]` dominates any later choice: moving the pin earlier never
removes a mark slot and only relaxes the "mark strictly after the pin"
release. So a schedule is fully described by the set `S` of indices cleared
at their first occurrences; index `i` then costs one pin second at its first
occurrence plus one mark after it, while every uncleared index costs
`nums[i]` decrements and one mark anywhere.

A set of clearances `S` is schedulable exactly when two families of
conditions hold. Counting: `sum(nums) + n - sum(nums[i]-1 for i in S) <= t`
(the pins replace whole decrement chains with single seconds). Deadlines:
ranking the chosen clearances by first occurrence `f`, the marks of every
suffix of them must fit into the seconds after `f` that are not themselves
pins, which folds into `2 * |S_{>= f}| <= t - f + 1`. Necessity of the cap
is pigeonhole on the window `(f, t]`; sufficiency follows by spending the
earliest free seconds on all decrements and placing the marks latest-first,
where the suffix counts stay satisfied window by window. These suffix caps
are a laminar matroid, so the maximum total saving is found greedily:
sweep first occurrences from latest to earliest, tentatively bank each
clearance worth `nums[i]-1`, and whenever the cap at the current deadline is
violated, give back the banked clearance with the smallest saving (a
min-heap). Feasibility is then just the counting inequality against the
maximum saving.

The sweep runs in `O(t log n)` per probe and the search probes `O(log m)`
horizons, so the whole method is `O(m log m log m)`; sums reach
`n × max(nums)` ≈ `5 × 10¹²`, past 32 bits, so all accumulation is done in
64-bit integers.

**Complexity:** `O(m log m log m)` time, `O(n + m)` space.
