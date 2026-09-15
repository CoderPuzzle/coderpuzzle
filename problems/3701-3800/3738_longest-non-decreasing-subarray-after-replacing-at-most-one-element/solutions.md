# Solutions — Longest Non-Decreasing Subarray After Replacing at Most One Element

## Prefix and suffix runs

Two linear passes record `pref[i]`, the length of the longest non-decreasing
run ending at index `i`, and `suff[i]`, the length of the longest run
starting there. Every subarray that survives with no replacement is measured
by one of these entries, so the larger of their maxima is the answer's
baseline — and it already covers the cases where the replacement goes
unspent or the array holds a single element.

A replacement at index `p` reshapes only the runs passing through `p`. When
the best run after replacing `p` stops at `p`, its left part is a run ending
at `p - 1` plus the new element: `pref[p - 1] + 1`. That is always feasible
because a free integer only has to reach `nums[p - 1]`; symmetrically,
`suff[p + 1] + 1` covers runs beginning at `p`. These one-sided candidates
earn their keep even though neither neighbor moved — when `nums[p - 1] >
nums[p + 1]` no value closes the gap, yet extending either side alone still
gains.

The full join places the replaced `p` between both neighbors and needs
`nums[p - 1] <= v <= nums[p + 1]`, satisfiable exactly when
`nums[p - 1] <= nums[p + 1]`; then `pref[p - 1] + suff[p + 1] + 1` positions
melt into one run. Taking the maximum over the baseline, both one-sided
sweeps, and every feasible join inspects each candidate once across four
linear passes.

**Complexity:** `O(n)` time, `O(n)` space.
