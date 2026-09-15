func minimumThreshold(n int, edges [][]int, source int, target int, k int) int {
	if source == target {
		return 0
	}
	type edge struct{ to, weight int }
	graph := make([][]edge, n)
	high := 0
	for _, item := range edges {
		u, v, weight := item[0], item[1], item[2]
		graph[u] = append(graph[u], edge{v, weight})
		graph[v] = append(graph[v], edge{u, weight})
		if weight > high {
			high = weight
		}
	}
	feasible := func(threshold int) bool {
		distance := make([]int, n)
		for i := range distance {
			distance[i] = k + 1
		}
		start := 2*len(edges) + n + 1
		queue := make([]int, 4*len(edges)+2*n+3)
		left, right := start, start+1
		queue[start] = source
		distance[source] = 0
		for left < right {
			node := queue[left]
			left++
			for _, item := range graph[node] {
				cost := 0
				if item.weight > threshold {
					cost = 1
				}
				candidate := distance[node] + cost
				if candidate < distance[item.to] && candidate <= k {
					distance[item.to] = candidate
					if cost == 0 {
						left--
						queue[left] = item.to
					} else {
						queue[right] = item.to
						right++
					}
				}
			}
		}
		return distance[target] <= k
	}
	if !feasible(high) {
		return -1
	}
	low := 0
	for low < high {
		middle := low + (high-low)/2
		if feasible(middle) {
			high = middle
		} else {
			low = middle + 1
		}
	}
	return low
}
