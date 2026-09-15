func maxScore(n int, k int, stayScore [][]int, travelScore [][]int) int {
	// dp[j] is the best score after the processed days with the tourist
	// in city j; every city starts at 0, which encodes the free choice
	// of the starting city. Each day, city j is either stayed in
	// (dp[j] + stayScore[i][j]) or reached by a move c -> j
	// (dp[c] + travelScore[c][j]). The c == j term is a 0-point no-op
	// (travelScore[i][i] == 0); keeping it inside the max is harmless,
	// since replacing a no-op day with a stay never lowers the score.
	dp := make([]int, n)
	for i := 0; i < k; i++ {
		reached := make([]int, n)
		for j := 0; j < n; j++ {
			best := dp[j] + stayScore[i][j]
			for c := 0; c < n; c++ {
				if moved := dp[c] + travelScore[c][j]; moved > best {
					best = moved
				}
			}
			reached[j] = best
		}
		dp = reached
	}
	answer := dp[0]
	for j := 1; j < n; j++ {
		if dp[j] > answer {
			answer = dp[j]
		}
	}
	return answer
}
