# Solutions — Design Exam Scores Tracker

## Sorted Times With Prefix Totals

The chronological discipline is what makes the cheap design correct. Times
arrive strictly increasing, so plain array appends keep them sorted with no
insertion work, and a query never looks past the last append, so nothing
already stored can change afterwards. Alongside the times the tracker keeps
one running total: appending an exam stores the previous total plus its
score, so entry `i` holds the sum of the first `i + 1` scores. Both arrays
grow by one cell per `record`, and that single store is all the maintenance
there is.

A query then reduces to locating its window inside the sorted times. Binary
search finds `l`, the first index whose time is at least `startTime`, and
`r`, one position before the first index whose time exceeds `endTime` — the
last index whose time is at most it. When `l > r` no exam falls inside the
interval, including the gap case where exams exist on both sides of an empty
stretch, and the answer is `0`. Otherwise the window's exams are exactly
entries `l..r`, and their scores total `prefix[r] - prefix[l - 1]`: both
totals count everything before the window, so it cancels. Two binary
searches over a sorted array, then a subtraction.

One width detail matters across languages: a single score reaches `10⁹` and
up to `10⁵` exams can pile up, so a total may approach `10¹⁴` — far past
32-bit range even though every individual score fits. The prefix array needs
64-bit integers (`long long`, `long`, `int64`, `i64`); Python integers grow
freely, and in JavaScript and TypeScript `10¹⁴` stays exact well below the
`2⁵³` ceiling of doubles.

**Complexity:** `O(1)` time per `record`; `O(log n)` time per `totalScore`;
`O(n)` space for the two arrays.
