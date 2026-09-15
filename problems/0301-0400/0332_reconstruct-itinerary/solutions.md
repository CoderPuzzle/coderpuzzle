# Solutions — Reconstruct Itinerary

## Hierholzer's algorithm (postorder Eulerian path)

Using every ticket exactly once is an Eulerian path problem: airports are vertices, tickets are directed edges, and the path must start at JFK. The solution builds an adjacency list mapping each departure airport to its destinations, then sorts each list in reverse lexicographic order — because edges are consumed by `pop()` from the end, this means the alphabetically smallest destination is always tried first.

A plain greedy walk can strand tickets: taking the smallest next airport may lead into a sub-graph whose exit edges are needed later. Hierholzer's algorithm avoids this by following edges depth-first and only recording an airport in the route during the postorder step, after all of its outgoing edges are exhausted. Airports appended early are dead ends; appending in postorder and reversing the whole list at the end produces a valid Eulerian path in which those dead ends appear at their latest possible position. Since the smallest available edge is always explored first, the reversed route is also the lexicographically smallest itinerary — any smaller itinerary would have required taking a smaller edge at some first divergence point, and the depth-first structure guarantees that choice is recoverable.

![The five tickets of example 2 as a directed multigraph over JFK, ATL, and SFO; numbered badges mark the order the depth-first walk consumes each edge, and reversing the postorder yields JFK → ATL → JFK → SFO → ATL → SFO.](figures/solution-eulerian-path.svg)

The recursion terminates when an airport has no unused edges left, which is guaranteed to happen for every airport because the problem promises at least one valid itinerary (JFK has one more departure than arrival, every other airport is balanced). With at most 300 tickets the recursion depth is safely bounded. Each ticket is pushed and popped exactly once.

**Complexity:** `O(E log E)` time (dominated by sorting the adjacency lists, where `E` is the number of tickets), `O(E)` space.
