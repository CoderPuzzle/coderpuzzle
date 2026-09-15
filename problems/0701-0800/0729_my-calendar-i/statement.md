# My Calendar I

## Description

You are implementing a program to use as your calendar. We can add a new event
if adding the event will not cause a **double booking**.

A double booking happens when two events have some non-empty intersection
(i.e., some moment is common to both events).

The event can be represented as a pair of integers `startTime` and `endTime`
that represents a booking on the half-open interval `[startTime, endTime)`,
the range of real numbers `x` such that `startTime <= x < endTime`.

Implement the `MyCalendar` class:

- `MyCalendar()` Initializes the calendar object.
- `boolean book(int startTime, int endTime)` Returns `true` if the event can
  be added to the calendar successfully without causing a double booking.
  Otherwise, return `false` and do not add the event to the calendar.

### Example 1

```text
Input:
["MyCalendar", "book", "book", "book"]
[[], [10, 20], [15, 25], [20, 30]]
Output: [null, true, false, true]
Explanation:
MyCalendar myCalendar = new MyCalendar();
myCalendar.book(10, 20); // return True
myCalendar.book(15, 25); // return False, It can not be booked because time 15 is already booked by another event.
myCalendar.book(20, 30); // return True, The event can be booked, as the first event takes every time less than 20, but not including 20.
```

### Constraints

- `0 <= startTime < endTime <= 10⁹`
- At most `1000` calls will be made to `book`.

## Hints

### Hint 1

If the booked events are kept **sorted by start time**, a new event can only
conflict with two of them: the last one that starts before it and the first
one that starts after it. Everything further away is separated from the new
event by one of those neighbors.

### Hint 2

Finding those two neighbors is a binary search over the starts. Note that
half-open intervals make the overlap test sharp: the previous event conflicts
exactly when its end is **greater than** the new start, and the next event
conflicts exactly when its start is **less than** the new end. Equality at
either boundary means the intervals merely touch — allowed.

### Hint 3

Only accepted bookings enter the structure; a rejected `book` must leave the
calendar exactly as it was. Inserting the new event at the position the binary
search found keeps the list sorted without ever re-sorting.
