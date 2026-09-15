# My Calendar III

## Description

A `k`-booking happens when `k` events have some non-empty intersection, i.e.
there is some moment of time that is common to all `k` events.

You are given events in the form `[startTime, endTime)` — the booking covers
the half-open interval from `startTime` (inclusive) to `endTime` (exclusive).
After each event is added, return an integer `k` representing the maximum
`k`-booking over the whole calendar.

Implement the `MyCalendarThree` class:

- `MyCalendarThree()` Initializes the calendar object.
- `int book(int startTime, int endTime)` Adds the event
  `[startTime, endTime)` and returns the largest integer `k` such that there
  exists a `k`-booking in the calendar.

Note that boundary-touching events do **not** overlap: `[10, 20)` and
`[20, 30)` share no common time, because the instant 20 belongs to the second
event only.

### Example 1

```text
Input:
["MyCalendarThree", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
Output: [null, 1, 1, 2, 3, 3, 3]
Explanation:
MyCalendarThree myCalendarThree = new MyCalendarThree();
myCalendarThree.book(10, 20); // return 1
myCalendarThree.book(50, 60); // return 1
myCalendarThree.book(10, 40); // return 2
myCalendarThree.book(5, 15);  // return 3
myCalendarThree.book(5, 10);  // return 3
myCalendarThree.book(25, 55); // return 3
```

### Example 2

```text
Input:
["MyCalendarThree", "book", "book", "book", "book"]
[[], [10, 20], [20, 30], [5, 21], [30, 40]]
Output: [null, 1, 1, 2, 2]
Explanation:
MyCalendarThree myCalendarThree = new MyCalendarThree();
myCalendarThree.book(10, 20); // return 1
myCalendarThree.book(20, 30); // return 1, [20, 30) touches [10, 20) but does not overlap it
myCalendarThree.book(5, 21);  // return 2, it overlaps both earlier events,
// but never both at once: at times [10, 20) the active events are
// [10, 20) and [5, 21); at times [20, 21) they are [20, 30) and [5, 21)
myCalendarThree.book(30, 40); // return 2, [30, 40) touches [20, 30) without overlapping it
```

### Constraints

- `0 <= startTime < endTime <= 10⁹`
- At most `400` calls will be made to `book`.

### Follow-up

Could you answer each `book` in `O(n log n)` time with a sweep over boundary
events, without any balanced tree or segment tree?

## Hints

### Hint 1

Each interval `[start, end)` contributes two boundary events: `+1` at `start`
and `-1` at `end`. If you walk the boundaries in sorted order, the running sum
of these deltas is exactly the number of active events — and the answer is the
largest running sum.

### Hint 2

Because intervals are half-open, sorting boundaries with ties broken so that
`-1` events come before `+1` events at the same time is not even needed here —
a plain sorted map from time to accumulated delta gives the same maximum,
since the running sum at an end boundary simply excludes the events that end
there.

### Hint 3

You do not need to rebuild the sweep from scratch after every booking... or
you may: with at most 400 calls, a fresh sweep over at most 800 boundaries per
call is only about 320,000 steps in total. Keep the deltas in one dictionary,
insert `+1`/`-1` per booking, and sweep the sorted keys each time.
