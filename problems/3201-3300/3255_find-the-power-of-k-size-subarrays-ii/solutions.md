# Solutions — Find the Power of K-Size Subarrays II

## Track one ascending-run length while sliding

Scan `nums` once while keeping `run`, the length of the strictly consecutive
ascending streak ending at the current index: extend it when
`nums[i] == nums[i - 1] + 1`, reset it to `1` otherwise — a duplicate or any
drop breaks consecutiveness just as well. Once `i` reaches at least `k - 1`,
the window `[i - k + 1, i]` has closed: its streak covers the whole window
exactly when `run >= k`, in which case every element is sorted ascending and
consecutive, so the power is the maximum `nums[i]`; otherwise the window
fails and the answer is `-1`.

![On nums [1, 2, 3, 4, 3, 2, 5] with k = 3 one scan writes the streak lengths 1, 2, 3, 4, 1, 1, 1 and answers each closing window on the spot: 3, 4, −1, −1, −1.](figures/solution-scan-run-answers.svg)

Each element is read once and each of the `n - k + 1` answers is written
once, so the total work stays linear no matter how often the runs break.
Only the current streak length survives between steps — constant state
beyond the output array itself.

**Complexity:** `O(n)` time, `O(1)` space beyond output.
