# Seat Reservation Manager

## Description

Design a system that manages the reservation state of `n` seats numbered from
`1` to `n`.

Implement the `SeatManager` class:

- `SeatManager(int n)` Initializes a `SeatManager` object that will manage `n`
  seats numbered from `1` to `n`. All seats are initially available.
- `int reserve()` Fetches the smallest-numbered unreserved seat, reserves it,
  and returns its number.
- `void unreserve(int seatNumber)` Unreserves the seat with the given number.

### Example 1

```text
Input:
["SeatManager", "reserve", "reserve", "unreserve", "reserve", "reserve", "reserve", "reserve", "unreserve"]
[[5], [], [], [2], [], [], [], [], [5]]
Output: [null, 1, 2, null, 2, 3, 4, 5, null]
Explanation:
SeatManager seatManager = new SeatManager(5); // 5 seats, all available.
seatManager.reserve();    // all seats are available, return the lowest: 1.
seatManager.reserve();    // available seats are [2, 3, 4, 5], return 2.
seatManager.unreserve(2); // unreserve seat 2; available seats are [2, 3, 4, 5].
seatManager.reserve();    // available seats are [2, 3, 4, 5], return 2.
seatManager.reserve();    // available seats are [3, 4, 5], return 3.
seatManager.reserve();    // available seats are [4, 5], return 4.
seatManager.reserve();    // the only available seat is 5, return 5.
seatManager.unreserve(5); // unreserve seat 5; available seats are [5].
```

### Constraints

- `1 <= n <= 10⁵`
- `1 <= seatNumber <= n`
- For each call to `reserve`, it is guaranteed that there will be at least one
  unreserved seat.
- For each call to `unreserve`, it is guaranteed that `seatNumber` will be
  reserved.
- At most `10⁵` calls in total will be made to `reserve` and `unreserve`.

### Follow-up

Could you avoid ever storing the seats that have been reserved for the first
time and never returned?

## Hints

### Hint 1

What `reserve` needs is the _minimum_ of a set that grows on every
`unreserve` and shrinks by exactly its minimum on every `reserve` — a min-heap
supports both halves, but materializing all `n` seats up front costs `O(n)`
memory even when most seats are never touched.

### Hint 2

Seats are handed out strictly in increasing order until something is
returned. Keep a counter `next` for the highest seat ever handed out: a fresh
`reserve` with an empty pile of returns simply answers `next + 1`.

### Hint 3

Only `unreserve` puts entries into the heap, and every entry is smaller than
`next`. `reserve` then takes the heap's top when the pile is non-empty, and
bumps the counter otherwise — the two sources never collide.
