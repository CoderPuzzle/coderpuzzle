# Exam Room

## Description

There is an exam room with `n` seats in a single row labeled from `0` to
`n - 1`.

When a student enters the room, they must sit in the seat that maximizes the
distance to the closest person. If there are multiple such seats, they sit in
the seat with the lowest number. If no one is in the room, then the student
sits at seat number `0`.

Design a class that simulates the mentioned exam room.

Implement the `ExamRoom` class:

- `ExamRoom(int n)` Initializes the object of the exam room with the number
  of the seats `n`.
- `int seat()` Returns the label of the seat at which the next student will
  sit.
- `void leave(int p)` Indicates that the student sitting at seat `p` will
  leave the room. It is guaranteed that there will be a student sitting at
  seat `p`.

### Example 1

```text
Input:
["ExamRoom", "seat", "seat", "seat", "seat", "leave", "seat"]
[[10], [], [], [], [], [4], []]
Output: [null, 0, 9, 4, 2, null, 5]
Explanation:
ExamRoom examRoom = new ExamRoom(10);
examRoom.seat(); // return 0, no one is in the room, then the student sits at seat number 0.
examRoom.seat(); // return 9, the student sits at the last seat number 9.
examRoom.seat(); // return 4, the student sits at the seat number 4.
examRoom.seat(); // return 2, the student sits at the seat number 2.
examRoom.leave(4);
examRoom.seat(); // return 5, the student sits at the seat number 5.
```

### Constraints

- `1 <= n <= 10⁹`
- It is guaranteed that there is a student sitting at seat `p`.
- At most `10⁴` calls will be made to `seat` and `leave`.

## Hints

### Hint 1

Between every pair of adjacent occupied seats lies one candidate seat — the
midpoint — with a quality equal to half the gap. The two edges are candidates
too: seat `0` at distance equal to the first occupied seat, and seat `n - 1`
at distance `n - 1 -` the last occupied seat. Represent each candidate as a
**segment** `(l, r)` between neighbors (using sentinels for the edges) and
the problem becomes "repeatedly take the best segment".

### Hint 2

A max-heap ordered by distance, then by seat number for ties, serves the best
segment. Sitting splits the winning segment `(l, r)` at seat `s` into `(l, s)`
and `(s, r)`; a `leave(p)` deletes the two segments touching `p` and creates
their union `(prev, next)`.

### Hint 3

Segments are destroyed and created constantly, so a heap alone goes stale.
Keep a set of live segments: a popped entry whose segment is no longer in the
set is garbage — skip it. A segment is worth storing only when it contains at
least one free seat (its endpoints differ by at least 2); the midpoint of
`(l, r)` is `(l + r) / 2` rounded down.

### Follow-up

Each call does heap and sorted-list work rather than scanning every occupied
seat. What is the worst-case number of live segments after `k` seat calls,
and does the lazy-deletion heap still beat a linear scan there?
