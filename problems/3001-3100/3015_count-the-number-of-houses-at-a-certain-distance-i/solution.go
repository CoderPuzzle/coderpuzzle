func countOfPairs(n int, x int, y int) []int {
	adjacency := make([][]int, n+1)
	for house := 1; house < n; house++ {
		adjacency[house] = append(adjacency[house], house+1)
		adjacency[house+1] = append(adjacency[house+1], house)
	}
	if x != y {
		adjacency[x] = append(adjacency[x], y)
		adjacency[y] = append(adjacency[y], x)
	}

	result := make([]int, n)
	for source := 1; source <= n; source++ {
		// Breadth-first distances from source over the chain plus the
		// extra street; every other house lands at distance >= 1.
		distance := make([]int, n+1)
		for house := range distance {
			distance[house] = -1
		}
		distance[source] = 0
		queue := []int{source}
		for head := 0; head < len(queue); head++ {
			house := queue[head]
			for _, neighbor := range adjacency[house] {
				if distance[neighbor] < 0 {
					distance[neighbor] = distance[house] + 1
					queue = append(queue, neighbor)
				}
			}
		}
		for target := 1; target <= n; target++ {
			// Skip the source itself: its distance-zero pair belongs to
			// no bucket.
			if distance[target] > 0 {
				result[distance[target]-1]++
			}
		}
	}
	return result
}
