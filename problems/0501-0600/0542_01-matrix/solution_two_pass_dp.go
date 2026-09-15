func updateMatrix(mat [][]int) [][]int {
	m := len(mat)
	n := len(mat[0])
	// No cell sits farther than m*n steps from a zero, so that value
	// stands in for "not yet settled" without colliding with a real
	// distance; zero cells start settled at 0.
	far := m*n + 1
	dist := make([][]int, m)
	for i := range dist {
		dist[i] = make([]int, n)
		for j := range dist[i] {
			if mat[i][j] == 0 {
				dist[i][j] = 0
			} else {
				dist[i][j] = far
			}
		}
	}
	// Forward sweep: each cell learns from the top and left neighbours,
	// so every zero up and to the left has already done its work here.
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if i > 0 && dist[i-1][j]+1 < dist[i][j] {
				dist[i][j] = dist[i-1][j] + 1
			}
			if j > 0 && dist[i][j-1]+1 < dist[i][j] {
				dist[i][j] = dist[i][j-1] + 1
			}
		}
	}
	// Backward sweep: the same argument with the bottom and right
	// neighbours, so a nearest zero in any direction has now been
	// heard from — whichever sweep met the closer zero wins.
	for i := m - 1; i >= 0; i-- {
		for j := n - 1; j >= 0; j-- {
			if i < m-1 && dist[i+1][j]+1 < dist[i][j] {
				dist[i][j] = dist[i+1][j] + 1
			}
			if j < n-1 && dist[i][j+1]+1 < dist[i][j] {
				dist[i][j] = dist[i][j+1] + 1
			}
		}
	}
	return dist
}
