# Solutions — Find Right Interval

## Sort the starts, bisect each end

For an interval `i`, the right interval is the one whose start is the
smallest start at or above `endi` — a "first value >= x" question, and those
are cheap on sorted data. So the plan forgets the input order entirely: pair
every start with the index it came from, sort the pairs by start, and each
interval's answer becomes one lower-bound bisection over that array. Unique
starts, which the statement guarantees, mean the smallest qualifying start
names exactly one interval, so there is never a tie to break.

Each interval then searches the sorted starts for its own `end`: the first
slot at or above it carries the original index to emit, and a search that
runs off the end means no start qualifies, so `-1` goes in. Because `i` may
equal `j`, nothing special happens when an interval's own start already
reaches its end — a `[5,5]` simply finds itself.

The bisection keeps the answer slot inside the live window: a mid below the
end retires everything up to it, anything else stays a candidate and shrinks
the window from the top. At the ceiling of `20000` intervals the sort
dominates; the `20000` searches each halve a window of that size.

**Complexity:** `O(n log n)` time, `O(n)` space.
