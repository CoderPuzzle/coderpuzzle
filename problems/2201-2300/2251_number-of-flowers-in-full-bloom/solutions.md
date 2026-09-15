# Solutions — Number of Flowers in Full Bloom

## Sorted starts and ends with binary search

A flower `[start, end]` is blooming at time `t` exactly when `start <= t <= end`, so the count at `t` splits into two independent one-sided counts: the number of flowers whose start is at most `t`, minus the number whose end is strictly before `t`. Both counts are answerable by binary search if the starts and the ends are each sorted — and crucially they can be sorted _separately_, because a query never needs to know which start belongs to which end, only the two counts.

The off-by-one at the boundary is the heart of it: with `starts` sorted, `bisect_right(starts, t)` gives the number of starts `<= t` (including `t` itself, since a flower starting exactly when the person arrives is blooming), and with `ends` sorted, `bisect_left(ends, t)` gives the number of ends `< t` — flowers that ended strictly earlier and have already wilted, while a flower ending exactly at `t` is correctly still counted as blooming. `bisect_left` vs `bisect_right` is precisely the distinction between the two inclusivities.

![The example bloom intervals on a time axis with the four arrival times as dashed vertical lines: t = 2 crosses one bar, t = 3 crosses two, t = 7 touches the right edge of [3,7] and [4,13] for two, and t = 11 crosses [9,12] and [4,13] for two.](figures/solution-bloom-timeline.svg)

Each query is then a single subtraction of two binary searches, and the list comprehension preserves the input order of `people` without any pairing or sorting of the queries themselves. With `F` flowers and `P` people, building the two sorted arrays costs `O(F log F)` and answering all people costs `O(P log F)`.

**Complexity:** `O(F log F + P log F)` time, `O(F)` space.
