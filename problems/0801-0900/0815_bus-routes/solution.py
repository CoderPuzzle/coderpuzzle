from typing import List, Optional


class Solution:
    def numBusesToDestination(self, routes: List[List[int]], source: int, target: int) -> int:
        # Early exits: same stop needs no bus; an endpoint on no route
        # has no path.
        if source == target:
            return 0
        # Map each stop to the routes passing through it.
        stop_to_routes = {}
        for r, stops in enumerate(routes):
            for s in stops:
                stop_to_routes.setdefault(s, []).append(r)
        if source not in stop_to_routes or target not in stop_to_routes:
            return -1
        used_routes = set()
        seen_stops = {source}
        queue = [(source, 0)]
        head = 0
        while head < len(queue):
            stop, buses = queue[head]
            head += 1
            for r in stop_to_routes.get(stop, []):
                # BFS over stops: boarding a route reaches all its
                # stops one level deeper. Expand each route only once
                # ever — re-boarding can only revisit stops already
                # found at an equal or smaller ride count.
                if r in used_routes:
                    continue
                used_routes.add(r)
                for nxt in routes[r]:
                    # The target is counted on sight — no need to
                    # enqueue it.
                    if nxt == target:
                        return buses + 1
                    if nxt not in seen_stops:
                        seen_stops.add(nxt)
                        queue.append((nxt, buses + 1))
        return -1
