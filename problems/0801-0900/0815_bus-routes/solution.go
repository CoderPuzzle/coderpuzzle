func numBusesToDestination(routes [][]int, source int, target int) int {
	// Early exits: same stop needs no bus; an endpoint on no route
	// has no path.
	if source == target {
		return 0
	}
	// Map each stop to the routes passing through it.
	stopToRoutes := make(map[int][]int)
	for r, stops := range routes {
		for _, s := range stops {
			stopToRoutes[s] = append(stopToRoutes[s], r)
		}
	}
	if _, ok := stopToRoutes[source]; !ok {
		return -1
	}
	if _, ok := stopToRoutes[target]; !ok {
		return -1
	}
	usedRoutes := make(map[int]bool)
	seenStops := make(map[int]bool)
	seenStops[source] = true
	type node struct {
		stop  int
		buses int
	}
	queue := []node{{source, 0}}
	head := 0
	for head < len(queue) {
		cur := queue[head]
		head++
		for _, r := range stopToRoutes[cur.stop] {
			// BFS over stops: boarding a route reaches all its
			// stops one level deeper. Expand each route only once
			// ever — re-boarding can only revisit stops already
			// found at an equal or smaller ride count.
			if usedRoutes[r] {
				continue
			}
			usedRoutes[r] = true
			for _, nxt := range routes[r] {
				// The target is counted on sight — no need to
				// enqueue it.
				if nxt == target {
					return cur.buses + 1
				}
				if !seenStops[nxt] {
					seenStops[nxt] = true
					queue = append(queue, node{nxt, cur.buses + 1})
				}
			}
		}
	}
	return -1
}
