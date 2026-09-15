func mostSimilar(n int, roads [][]int, names []string, targetPath []string) []int {
	adjacency := make([][]int, n)
	for _, road := range roads {
		a, b := road[0], road[1]
		adjacency[a] = append(adjacency[a], b)
		adjacency[b] = append(adjacency[b], a)
	}

	pathLength := len(targetPath)
	dp := make([][]int, pathLength)
	parent := make([][]int, pathLength)
	for i := range dp {
		dp[i] = make([]int, n)
		parent[i] = make([]int, n)
	}
	for city := 0; city < n; city++ {
		if names[city] == targetPath[0] {
			dp[0][city] = 0
		} else {
			dp[0][city] = 1
		}
	}

	for i := 1; i < pathLength; i++ {
		for city := 0; city < n; city++ {
			bestParent := -1
			bestCost := -1
			for _, neighbor := range adjacency[city] {
				candidate := dp[i-1][neighbor]
				if bestParent == -1 || candidate < bestCost {
					bestCost = candidate
					bestParent = neighbor
				}
			}
			mismatchCost := 1
			if names[city] == targetPath[i] {
				mismatchCost = 0
			}
			dp[i][city] = bestCost + mismatchCost
			parent[i][city] = bestParent
		}
	}

	endCity := 0
	for city := 1; city < n; city++ {
		if dp[pathLength-1][city] < dp[pathLength-1][endCity] {
			endCity = city
		}
	}

	path := make([]int, pathLength)
	city := endCity
	for i := pathLength - 1; i >= 0; i-- {
		path[i] = city
		city = parent[i][city]
	}
	return path
}
