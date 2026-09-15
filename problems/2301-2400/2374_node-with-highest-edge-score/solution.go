func edgeScore(edges []int) int {
	// Node edges[i] gains i to its score, so one accumulation pass fills
	// every score; a second pass picks the highest with the smallest index
	// (strict > keeps the earlier node on ties). Scores reach ~n^2/2 = 5e9,
	// so accumulate in 64 bits.
	scores := make([]int64, len(edges))
	for source, target := range edges {
		scores[target] += int64(source)
	}
	bestNode := 0
	for node := 1; node < len(scores); node++ {
		if scores[node] > scores[bestNode] {
			bestNode = node
		}
	}
	return bestNode
}
