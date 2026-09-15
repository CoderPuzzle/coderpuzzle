# Solutions — Delayed Count of Equal Elements

Every index only asks how many equal elements sit more than `k` positions
ahead of it, so one suffix frequency map swept from the right answers all
of them in a single pass.

## Suffix frequency map, right to left

Scan `i` from `n - 1` down to `0` while `freq` counts, for each value, how
many of its occurrences lie in the window `[i + k + 1, n - 1]`. Stepping
from `i + 1` to `i` lowers that window's left edge by exactly one position,
so before answering index `i` the loop inserts the one newly exposed
element, `nums[i + k + 1]`, whenever that index exists; afterwards `freq`
is precisely the multiset of candidate `j` with `i + k < j <= n - 1`, and
the delayed count is a single lookup, `ans[i] = freq[nums[i]]`. The last
`k + 1` indices can never see a candidate — their window is empty from
the start — so they read zero without any special case.

Each of the `n` steps does one insert and one lookup, so the pass is
linear. The map holds at most `n` entries and the output is length `n`,
while every count is bounded by `n <= 10⁵` — comfortably inside 32-bit
integers in all seven languages, with JS numbers exact far below 2⁵³.
The loop is flat iteration, no recursion, so stack depth is never a
concern.

**Complexity:** `O(n)` time, `O(n)` space.
