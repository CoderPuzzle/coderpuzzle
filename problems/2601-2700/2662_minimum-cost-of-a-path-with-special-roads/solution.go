func minimumCost(start []int, target []int, specialRoads [][]int) int {
	// By hint 1 an optimal route only ever stops at road endpoints (plus
	// start and target): any other intermediate point is dominated by
	// walking straight past it. Build that candidate set deduped, join
	// every pair with a Manhattan-priced walk, add each special road as
	// one directed edge priced at its own cost, and run Dijkstra.
	index := make(map[[2]int]int)
	points := make([][2]int, 0, 2*len(specialRoads)+2)
	add := func(x, y int) int {
		key := [2]int{x, y}
		if id, ok := index[key]; ok {
			return id
		}
		id := len(points)
		index[key] = id
		points = append(points, key)
		return id
	}
	startID := add(start[0], start[1])
	targetID := add(target[0], target[1])
	type edge struct{ from, to, cost int }
	roads := make([]edge, 0, len(specialRoads))
	for _, road := range specialRoads {
		roads = append(roads, edge{add(road[0], road[1]), add(road[2], road[3]), road[4]})
	}
	n := len(points)
	abs := func(v int) int {
		if v < 0 {
			return -v
		}
		return v
	}
	const inf = int(^uint(0) >> 1)
	dist := make([]int, n)
	used := make([]bool, n)
	for v := range dist {
		dist[v] = inf
	}
	dist[startID] = 0
	for round := 0; round < n; round++ {
		// Nearest unvisited node scan keeps the code heap-free; with at
		// most ~402 candidates the quadratic cost is negligible.
		u := -1
		for v := 0; v < n; v++ {
			if !used[v] && (u == -1 || dist[v] < dist[u]) {
				u = v
			}
		}
		if u == -1 || dist[u] == inf {
			break
		}
		used[u] = true
		for v := 0; v < n; v++ {
			if used[v] {
				continue
			}
			walk := dist[u] + abs(points[v][0]-points[u][0]) + abs(points[v][1]-points[u][1])
			if walk < dist[v] {
				dist[v] = walk
			}
		}
		for _, road := range roads {
			if road.from == u && dist[u]+road.cost < dist[road.to] {
				dist[road.to] = dist[u] + road.cost
			}
		}
	}
	return dist[targetID]
}
