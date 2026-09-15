func countPairs(coordinates [][]int, k int) int {
	type point struct {
		x, y int
	}

	total := 0
	seen := make(map[point]int)
	for _, p := range coordinates {
		current := point{p[0], p[1]}
		for split := 0; split <= k; split++ {
			total += seen[point{p[0] ^ split, p[1] ^ (k - split)}]
		}
		seen[current]++
	}
	return total
}
