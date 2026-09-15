# Solutions — Longest Arithmetic Sequence After Changing At Most One Element

## Run tables with a bridge merge

Build two run tables. `left[i]` holds the length of the longest run of equal
consecutive differences ending at index `i` (`1` for the lone `nums[i]`, `2`
for any pair), and `right[i]` mirrors it for runs starting at `i`. Each
table fills in one linear pass: a step `nums[i-1], nums[i]` continues the
run exactly when its difference equals the previous step's difference, and
otherwise restarts the run at length `2`. The best subarray that changes
nothing is the maximum over `left`.

Replacing an element `nums[p]` can only help when the selected subarray
includes `p`. If it stops at `p`, the unchanged side is an arithmetic run:
growing out of the run ending at `p-1` or starting at `p+1` gives the
candidates `left[p-1] + 1` and `right[p+1] + 1`. If the subarray spans `p`,
the two sides must share a common difference, and replacing `nums[p]` forces
that difference to `d = (nums[p+1] - nums[p-1]) / 2` — it must be an integer
for a bridge to exist. The left side is then the run of difference `d`
ending at `p-1` (collapsing to the single element `nums[p-1]` when its last
difference is not `d`), the right side the run of difference `d` starting at
`p+1`, and the candidate is their sum plus one for `nums[p]` itself.

Every table value, candidate, and the answer are bounded by `n <= 10⁵`, so
32-bit arithmetic carries everything (JavaScript's doubles are exact far
inside `2⁵³`), and all passes are plain iterative loops over the input.

**Complexity:** `O(n)` time, `O(n)` space.
