func winningPlayerCount(n int, pick [][]int) int {
	counts := make([][11]int, n)
	for _, p := range pick {
		counts[p[0]][p[1]]++
	}

	winners := 0
	for player := 0; player < n; player++ {
		best := 0
		for _, count := range counts[player] {
			if count > best {
				best = count
			}
		}
		if best > player {
			winners++
		}
	}
	return winners
}
