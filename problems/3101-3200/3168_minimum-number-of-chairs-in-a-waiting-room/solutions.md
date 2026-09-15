# Solutions — Minimum Number of Chairs in a Waiting Room

## Running occupancy peak

Chairs never need to exceed the number of people present, and a newly freed
chair is reusable, so the minimum chair count is exactly the largest number
of people simultaneously in the room. One left-to-right sweep maintains the
live occupancy — incremented on every `'E'`, decremented on every `'L'` —
and raises a running maximum whenever an entry pushes the count to a new
peak. Validity of the event string guarantees the counter never dips below
zero.

Each character is examined once with constant work per step, and no extra
storage beyond two integers is required; the answer is bounded by
`s.length <= 50`.

**Complexity:** `O(n)` time for `n = len(s)`, `O(1)` space.
