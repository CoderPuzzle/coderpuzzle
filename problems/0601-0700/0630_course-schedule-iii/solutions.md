# Solutions — Course Schedule III

## Deadline Greedy with Max-Heap Exchange

Courses are processed in order of increasing `last_day`. An exchange argument makes this safe: if a set of courses can be completed at all under some interleaving, completing them sorted by deadline is also feasible, so deciding course by course in deadline order never misses an optimum. What the greedy must decide, at each course, is whether adding it keeps the chosen set completable.

The solution maintains the running total duration of the taken courses plus a max-heap of their durations (Python's min-heap with negated values). If the current course fits before its deadline, it is taken. If it does not fit, it is compared with the longest course already taken: when that longest course is strictly longer, the two are swapped — the new course replaces it in the heap and the total time shrinks by the difference. The course count is unchanged, and because the new total is no larger than the old one, every previously taken course still finishes before its (earlier-or-equal) deadline, so feasibility is preserved.

Why swapping helps: replacing a long course with a shorter, later-deadline one leaves strictly more time for everything that follows, so any schedule extending the old set extends the new one too. Courses whose duration already exceeds their own deadline never enter the heap, since they fit neither branch. The answer is the heap size after all courses are processed.

Sorting plus one heap operation per course dominates; each push or replace is logarithmic in the heap size.

Example 1 walks the heap through all four courses:

1. Sorted by deadline, the courses arrive as (100, 200), (1000, 1250), (200, 1300), (2000, 3200).
2. (100, 200) fits — total 100 — so it is taken: heap `{100}`.
3. (1000, 1250) fits — total 1100 — heap `{100, 1000}`.
4. (200, 1300) fits exactly — total 1300 — heap `{100, 200, 1000}`.
5. (2000, 3200) would need total 3300, and the longest taken course (1000) is not longer than 2000, so no swap helps; the answer is the heap size 3.

**Complexity:** `O(N log N)` time, `O(N)` space.
