# Solutions — Longest Continuous Increasing Subsequence

## Single pass with a run counter

Continuity is what makes this easy: a continuous increasing subsequence is
just a stretch of the array where every element strictly beats its
predecessor, and such runs partition the array — every position belongs to
exactly one maximal run, the one ending at it. So the answer is the length
of the longest run, and one left-to-right pass with two counters sees every
candidate: `run` measures the strictly increasing stretch under the cursor,
`best` remembers the longest one seen so far.

Both counters start at 1, because a lone element is already an increasing
run of length 1 — which is why a one-element array answers 1 without the
loop ever running. For each `i` from 1 on, a strict rise `nums[i - 1] <
nums[i]` grows `run` by one and raises `best` to at least `run`; anything
else — a drop or an equal value — ends the run and restarts it at 1.
Strictness does all the discriminating: in Example 2 the equal 2s never
rise, so every run stays at length 1. A run reaches its full length only at
its final element, right where the next comparison fails or the array ends,
and updating `best` while the run grows records it exactly there — the
classic slip of updating only on a break would miss a run that closes at
the last element.

Example 1 splits `[1,3,5,4,7]` where 4 fails to clear 5, giving runs
`[1,3,5]` and `[4,7]` of lengths 3 and 2, so the answer is 3; `[1,3,5,7]`
climbs further as a subsequence but skips the 4 and is not continuous. The
elements are only ever compared, never combined, so the constraint's
±10⁹ extremes need no wider arithmetic.

**Complexity:** `O(n)` time, `O(1)` space.
