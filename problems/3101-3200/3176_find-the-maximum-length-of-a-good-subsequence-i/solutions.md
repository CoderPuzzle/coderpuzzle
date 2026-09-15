# Solutions — Find the Maximum Length of a Good Subsequence I

## Rolling per-budget bests by ending value

A good subsequence may switch values at most k times, so the natural DP
carries the change budget as a second axis. For every change budget `a`,
keep two facts about the prefix processed so far: `row[v][a]`, the longest
good subsequence that uses exactly `a` changes and ends on value `v`, and
`endsAll[a]`, the same maximum over all ending values. Scanning nums once,
each new element either extends a subsequence already ending in its own
value — free, since the new adjacent pair does not differ — or appends after
any earlier element, which turns one previously available budget slot into a
spent one: exactly the transition of the statement's third hint with the
"any y" lookup collapsed into the mirrored `endsAll[a - 1]`.

Both lookups must observe stats frozen before the current element — an
element cannot extend a chain ending at itself — so each element first
computes its candidate row against a snapshot, then folds it into `row` and
`endsAll`. Values up to 10⁹ are irrelevant beyond equality, so per-value
rows live in a hash map keyed by the raw integers, no remapping needed.
The answer is the largest entry of `endsAll` after the sweep: every good
subsequence is counted under its exact change count, and "at most k" is the
union over budgets 0..k.

**Complexity:** `O(nk)` time, `O(Vk)` space, where V is the number of
distinct values.
