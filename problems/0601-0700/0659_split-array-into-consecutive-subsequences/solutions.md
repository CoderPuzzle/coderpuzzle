# Solutions — Split Array into Consecutive Subsequences

## Greedy walk with a need counter

Walk the sorted array once carrying two counter maps: `left[v]` counts copies of
`v` not yet placed, and `need[v]` counts subsequences whose next wanted value is
`v`. Each element `x` — skipping copies an earlier-started run has already
consumed — has two ways to be placed. If `need[x]` is positive, hand `x` to a
waiting subsequence: the run that ended at `x - 1` now ends at `x` and wants
`x + 1`. Otherwise `x` has to start a fresh run, which is legal only when an
`x + 1` and an `x + 2` are still unplaced; the newborn run takes both ahead of
their position in the walk and wants `x + 3`. If neither move is possible, `x`
can join nothing legal and the answer is `false`.

Extending always beats starting. A valid split that gives some copy of `x` to a
fresh run while another copy of `x` extends a run ending at `x - 1` can be
rearranged into one where the extending copy does that work twice over — equal
copies are interchangeable, so trading which copy plays which role changes
nothing, and the extended run only ever grows. The asymmetry that settles the
choice is in obligations: extending moves one existing obligation from `x` to
`x + 1` and creates none, while starting a run creates two immediate
obligations (`x + 1`, `x + 2`) that only this run can satisfy. Runs die exactly
when their wanted value runs out or a gap arrives while they are still shorter
than three, so feeding the shortest-lived commitments first — extend, then
start — is the order that never strands a run at length one or two while raw
material remains.

Because the input is sorted, a started run really may eat copies the walk has
not reached yet, and the `left[x] == 0` skip is what keeps each element placed
exactly once; values lie in `[-1000, 1000]`, so `x + 3` never leaves the range
a counter map is happy to hold. The min-heap-per-value form and the two-map
counts-plus-ended-runs form are equivalent restatements; this is the
counter-map greedy.

**Complexity:** `O(n)` time, `O(n)` space.
