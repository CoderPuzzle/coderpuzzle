# Solutions — The Number of Passengers in Each Bus I

## Count arrivals on one ordered event timeline

Combine passenger arrivals and bus arrivals into one event stream, ordering passengers before a bus at the same time. A running sum of passenger events gives the total number of passengers who have arrived by each bus. After retaining only bus events, subtract the previous bus's cumulative total to obtain exactly the passengers whose first eligible bus is the current one.

The final sort uses `bus_id`, independently of chronological bus order. If there are `B` buses and `P` passengers, the window order dominates the work and the event CTE stores their combined rows.

**Complexity:** `O((B + P) log(B + P))` time and `O(B + P)` space.
