func minCost(maxTime int, edges [][]int, passingFees []int) int {
	n := len(passingFees)
	const INF = 1 << 30
	// Unfold the graph into layers indexed by exact arrival time:
	// layers[t][c] = min fee of any walk from city 0 arriving at c at minute
	// t exactly. Within one time layer, minimizing cost is well-defined, so
	// revisiting a city at a different time stays legal.
	layers := make([][]int, maxTime+1)
	start := make([]int, n)
	for v := range start {
		start[v] = INF
	}
	start[0] = passingFees[0]
	layers[0] = start
	for t := 1; t <= maxTime; t++ {
		cur := make([]int, n)
		for v := range cur {
			cur[v] = INF
		}
		for _, e := range edges {
			x, y, dt := e[0], e[1], e[2]
			if dt > t {
				continue // edge cannot fit in the elapsed time
			}
			// Relax both directions from the layer exactly dt minutes ago.
			prev := layers[t-dt]
			if prev[x] < INF && prev[x]+passingFees[y] < cur[y] {
				cur[y] = prev[x] + passingFees[y]
			}
			if prev[y] < INF && prev[y]+passingFees[x] < cur[x] {
				cur[x] = prev[y] + passingFees[x]
			}
		}
		layers[t] = cur
	}
	// Destination may be reached before maxTime: take the min over all time
	// layers; all-infinity means no feasible walk.
	best := INF
	for _, layer := range layers {
		if layer[n-1] < best {
			best = layer[n-1]
		}
	}
	if best >= INF {
		return -1
	}
	return best
}
