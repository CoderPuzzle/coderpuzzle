# Solutions — The Latest Time to Catch a Bus

## Sort both lists and simulate boarding

Sort `buses` and `passengers`, then sweep the buses in departure order,
letting each take up to `capacity` passengers off the front of the queue —
the waiting passengers with the earliest arrival times, all of whom arrived
no later than that bus departs. Only the last bus decides the answer.

If the last bus departs with seats to spare, everyone who could wait for it
already fits, so arriving at its departure minute itself catches it. If it
departs full, the latest workable moment is the minute before the last
passenger it took: arriving then still leaves us among the `capacity`
earliest arrivals for that bus, while any later minute the bus fills with
strictly earlier arrivals and shuts us out. A chosen minute may coincide
with another passenger's arrival, which is forbidden, so walk the candidate
down until it lands on a free minute — arriving earlier never costs a seat.

**Complexity:** `O(n log n + m log m)` time, `O(m)` space.
