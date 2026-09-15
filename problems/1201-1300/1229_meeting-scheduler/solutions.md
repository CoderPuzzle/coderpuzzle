# Solutions — Meeting Scheduler

## Two pointers over the sorted slots

Sort both slot lists by start. A pair of slots overlaps in
`[max(start1, start2), min(end1, end2)]`, and the earliest meeting both can
attend inside that overlap starts at `max(start1, start2)` — so testing each
overlapping pair in start order and returning the first fit yields the
earliest slot overall.

The two pointers never revisit a pair: if `end1 < end2`, slot1 ends too early
to help any later slot2 (they only start further right), so only pointer 1
advances; symmetrically otherwise. Each slot is skipped at most once by each
pointer, giving a linear merge after the sort.

When an overlap is at least `duration` long, the answer is
`[max(start1, start2), max(start1, start2) + duration]`; if the merge
finishes without one, the two calendars share no long-enough window and the
result is empty.

**Complexity:** `O(m log m + n log n)` time for the two sorts and linear
merge, `O(1)` extra space beyond the sorted views.
