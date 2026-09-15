func calculateMinimumHP(dungeon [][]int) int {
	m := len(dungeon)
	n := len(dungeon[0])
	const INF = 1 << 30
	// need[i][j]: smallest health needed when ENTERING (i, j) so some
	// right/down path survives to the princess. An INF border keeps
	// out-of-bounds neighbors from ever being chosen.
	need := make([][]int, m+1)
	for i := range need {
		need[i] = make([]int, n+1)
		for j := range need[i] {
			need[i][j] = INF
		}
	}
	// Seed: leaving the bottom-right room requires at least 1 health.
	need[m][n-1] = 1
	// Fill bottom-to-top, right-to-left so both onward values are final.
	for i := m - 1; i >= 0; i-- {
		for j := n - 1; j >= 0; j-- {
			// Take the cheaper onward room, pay this room's effect.
			bestNext := need[i+1][j]
			if need[i][j+1] < bestNext {
				bestNext = need[i][j+1]
			}
			v := bestNext - dungeon[i][j]
			// Health must stay at least 1 — 0 or below is fatal.
			if v < 1 {
				v = 1
			}
			need[i][j] = v
		}
	}
	return need[0][0]
}
