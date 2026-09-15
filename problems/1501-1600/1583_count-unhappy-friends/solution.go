func unhappyFriends(n int, preferences [][]int, pairs [][]int) int {
	// rank[i][j] = how highly friend i ranks friend j (lower = more preferred).
	rank := make([][]int, n)
	for i := 0; i < n; i++ {
		rank[i] = make([]int, n)
		for position, friend := range preferences[i] {
			rank[i][friend] = position
		}
	}

	partner := make([]int, n)
	for _, pair := range pairs {
		partner[pair[0]] = pair[1]
		partner[pair[1]] = pair[0]
	}

	unhappy := 0
	for x := 0; x < n; x++ {
		y := partner[x]
		for u := 0; u < n; u++ {
			if u == x || u == y {
				continue
			}
			v := partner[u]
			if rank[x][u] < rank[x][y] && rank[u][x] < rank[u][v] {
				unhappy++
				break
			}
		}
	}
	return unhappy
}
