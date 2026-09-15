# Solutions — The Time When the Network Becomes Idle

## Breadth-first search and last resend

Build the undirected graph and run breadth-first search from server 0. Because every channel takes one second, the BFS distance is the shortest one-way travel time from each data server to the master, so twice that distance is the first reply's arrival time.

A server resends only at multiples of its patience that are strictly earlier than the first reply. Thus its last send time is `((roundTrip - 1) / patience[i]) * patience[i]`, and the reply to that message arrives one round trip later. The answer is one second beyond the latest such arrival over all data servers.

**Complexity:** `O(n + edges.length)` time and `O(n + edges.length)` space.
