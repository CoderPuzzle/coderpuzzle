# Solutions — Remove Covered Intervals

## Sort by start, then sweep the best end

Sort the intervals by start ascending and, on ties, end descending. In
that order an interval is uncovered exactly when its end pushes past the
largest end seen among everything before it: any earlier interval either
starts strictly to its left (covering it if the end is also big enough)
or shares its start with a larger (or equal) end already recorded — the
descending tiebreak guaranteeing the wider twin lands first, so the
narrower one is counted as covered even though starts are equal. One
linear sweep keeping `best_end` counts the survivors.

**Complexity:** `O(n log n)` time for the sort over `n` intervals,
`O(1)` space beyond the sort.
