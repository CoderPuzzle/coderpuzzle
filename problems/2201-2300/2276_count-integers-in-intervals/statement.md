# Count Integers in Intervals

## Description

Given an empty set of intervals, implement a data structure that can:

- Add an interval to the set of intervals.
- Count the number of integers that are present in at least one interval.

Implement the `CountIntervals` class:

- `CountIntervals()` Initializes the object with an empty set of intervals.
- `void add(int left, int right)` Adds the interval `[left, right]` to the
  set of intervals.
- `int count()` Returns the number of integers that are present in at least
  one interval.

An interval `[left, right]` denotes all the integers `x` where
`left <= x <= right`.

### Example 1

```text
Input:
["CountIntervals", "add", "add", "count", "add", "count"]
[[], [2, 3], [7, 10], [], [5, 8], []]
Output: [null, null, null, 6, null, 8]
Explanation:
CountIntervals countIntervals = new CountIntervals(); // the set is empty.
countIntervals.add(2, 3);  // add [2, 3] to the set.
countIntervals.add(7, 10); // add [7, 10] to the set.
countIntervals.count();    // return 6
                           // 2 and 3 are present via [2, 3];
                           // 7, 8, 9 and 10 are present via [7, 10].
countIntervals.add(5, 8);  // add [5, 8]: the set becomes {[2, 3], [5, 10]}.
countIntervals.count();    // return 8 — 2, 3, 5, 6, 7, 8, 9, 10.
```

### Constraints

- `1 <= left <= right <= 10⁹`
- At most `10⁵` calls in total will be made to `add` and `count`.
- At least one call will be made to `count`.

### Follow-up

Each `add` can swallow many existing intervals at once — why does the total
number of swallowed intervals over the whole run stay bounded by the number
of `add` calls?

## Hints

### Hint 1

Keeping the intervals disjoint and sorted by start reduces `count` to a
number you can maintain incrementally — every merge then only has to correct
that running total by the sizes of what it removes and inserts.

### Hint 2

With disjoint intervals sorted by start, the ends are sorted too, so the
intervals that overlap `[left, right]` form one contiguous run: those with
start `<= right` whose end is `>= left`. A binary search on starts locates
the run.

### Hint 3

Replace that whole run (plus the new interval) by their hull —
`min(left, first start)` to `max(right, last end)` — updating the running
count by subtracting each removed interval's size and adding the hull's. An
ordered map keyed by start (a balanced tree) does the locate-and-splice in
logarithmic time.
