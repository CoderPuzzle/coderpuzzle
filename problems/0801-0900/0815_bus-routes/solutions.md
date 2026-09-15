# Solutions — Bus Routes

## BFS over stops with route dedup

The search runs over bus stops rather than routes: from a stop you may board any route not yet used and land on every stop that route visits. A plain BFS then measures rides directly — each level of the queue costs exactly one more bus. Two dedup structures keep the traversal linear: `used_routes` records boarded routes so a route's stop list is expanded only once ever, and `seen_stops` prevents re-enqueueing a stop. Marking a route used is safe because boarding it again can only revisit stops already discovered at an equal or smaller ride count.

Setup builds `stop_to_routes`, mapping each stop to the indices of the routes passing through it, in one pass over the input. Two early exits prune impossible inputs before the search: if `source == target` no bus is needed (`0`), and if either endpoint appears on no route at all there is no path (`-1`).

The queue holds `(stop, buses)` pairs and is drained in level order with a moving head index. When expanding a freshly boarded route, the code scans that route's stops and returns `buses + 1` immediately upon spotting the target — the target does not need to be enqueued to be counted. Stops already seen are skipped; unseen ones join the queue at the next level. If the queue empties without meeting the target, the answer is `-1`.

**Complexity:** `O(S)` time and space, where `S` is the total number of stop entries across all routes.
