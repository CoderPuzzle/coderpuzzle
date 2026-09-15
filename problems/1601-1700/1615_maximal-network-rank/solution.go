func maximalNetworkRank(n int, roads [][]int) int {
	degree := make([]int, n)
	connected := make(map[[2]int]bool)
	for _, road := range roads {
		a, b := road[0], road[1]
		degree[a]++
		degree[b]++
		if a > b {
			a, b = b, a
		}
		connected[[2]int{a, b}] = true
	}

	best := 0
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			rank := degree[i] + degree[j]
			if connected[[2]int{i, j}] {
				rank--
			}
			if rank > best {
				best = rank
			}
		}
	}
	return best
}
