# Solutions — Flight Occupancy and Waitlist Analysis

## Left join onto per-flight passenger counts

The booking rule is a per-flight threshold on one number: how many
passengers want a seat versus how many seats exist. So the query first
reduces `Passengers` to that number — GROUP BY flight_id with COUNT(*)
produces one row per wanted flight and its demand — and then attaches
the tally to `Flights` with a LEFT JOIN driven by `Flights` itself.
Driving from the flight side is what keeps every flight in the answer:
an INNER JOIN would silently drop each zero-passenger flight, which the
statement still requires reported as 0 booked and 0 waitlisted.

The join miss shows up as NULL, so COALESCE(cnt, 0) normalizes it to a
count of zero before any arithmetic reads it. What remains is two
clamped expressions over SQLite's two-argument scalar min/max:
MIN(cnt, capacity) books everyone up to the seat count and no further,
and MAX(cnt - capacity, 0) waits everyone past capacity while pinning
the exactly-at-capacity case to an empty waitlist instead of a negative
one. A zero-capacity flight falls out of the same clamps — nobody can
book, every passenger waits — without special-casing.

The outer SELECT projects flight_id with its two tallies and sorts with
ORDER BY flight_id ASC, the order the judge compares exactly.

Aggregating p passenger rows costs O(p log p) comparisons to group
(plus f flights joined against the small aggregated result), and the
intermediate holds one row per flight.

**Complexity:** `O(p log p)` time, `O(p)` space.
