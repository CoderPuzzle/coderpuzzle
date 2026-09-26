# Solutions — The Time When the Network Becomes Idle

## Breadth-first search and last resend

Build the undirected graph and run breadth-first search from server 0. Because every channel takes one second, the BFS distance is the shortest one-way travel time from each data server to the master, so twice that distance is the first reply's arrival time.

A server resends only at multiples of its patience that are strictly earlier than the first reply. Thus its last send time is `((roundTrip - 1) / patience[i]) * patience[i]`, and the reply to that message arrives one round trip later. The answer is one second beyond the latest such arrival over all data servers.

![On edges = [[0,1],[1,2]], patience = [0,2,1], server 1's round trip is 2 (reply at 2) and server 2 resends at 0, 1, 2, 3, so its last reply lands at 3 + 4 = 7 and the network idles from second 8.](figures/solution-bfs-roundtrip-idle.svg)

**Complexity:** `O(n + edges.length)` time and `O(n + edges.length)` space.
