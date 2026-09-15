# Solutions — Status of Flight Tickets

## Rank passengers by booking time within their flight

The booking rule is a per-flight ranking: a passenger keeps a seat
exactly when fewer than `capacity` passengers of the same flight booked
strictly earlier. Booking times are distinct, so the first pass assigns
that rank tie-free — `ROW_NUMBER() OVER (PARTITION BY flight_id ORDER
BY booking_time)` numbers each flight's passengers in booking order,
1 being the earliest. The rank is temporal on purpose: nothing about
passenger_id enters it, which is why a dataset where higher ids booked
earlier expects those ids confirmed.

The second pass joins the ranked rows to `Flights` to fetch each
flight's capacity and turns one comparison into the status —
`CASE WHEN rn <= capacity THEN 'Confirmed' ELSE 'Waitlist' END`. The
boundary lands exactly on capacity, so `<=` makes the capacity-th
booker the last confirmer and rank capacity + 1 the first waitlisted
passenger; a zero-capacity flight waitlists everyone through the same
comparison. The join is driven from the passenger side, so flights
without passengers produce no row — the output is per passenger.
`ORDER BY passenger_id ASC` then supplies the order the judge compares
exactly.

Ranking sorts each flight's passengers, n log n comparisons over n
passenger rows in total, with O(n) intermediate rows.

**Complexity:** `O(n log n)` time, `O(n)` space.
