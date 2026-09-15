# Solutions — Reschedule Meetings for Maximum Free Time I

## Sliding window over the gaps

A meeting that is left alone pins its position on the timeline, so a single
continuous free block can only cover gaps whose separating meetings are all
rescheduled — and at most `k` meetings may move, so at most `k + 1` consecutive
gaps can ever merge. Conversely, that bound is achievable: take any `k`
consecutive meetings, compact them against one edge of the span they occupy,
and every gap between and around them collapses into one block whose length is
exactly the sum of those `k + 1` gaps (the meeting durations still have to fit
inside the span, and compaction leaves them contiguous at its edge). The
answer is therefore the maximum sum of `k + 1` consecutive gaps.

The `n + 1` gaps — before the first meeting, between adjacent meetings, and
after the last — are read straight off the two arrays, and a rolling window of
fixed width `k + 1` slides over them once: add the entering gap, subtract the
leaving one, keep the maximum. When `k = n` the window is the whole gap list
and the loop body never runs.

Every gap is non-negative and the gaps partition the time not spent in
meetings, so every window sum is at most `eventTime <= 10⁹ < 2³¹` — 32-bit
arithmetic is exact everywhere, and every value stays far below the `2⁵³`
where JavaScript numbers would lose precision.

**Complexity:** `O(n)` time, `O(n)` space for the gap array — `O(1)` beyond it.
