import "sort"

func bestTeamScore(scores []int, ages []int) int {
	n := len(scores)
	order := make([]int, n)
	for i := range order {
		order[i] = i
	}
	// Sort player indices by age, breaking ties by score, so any
	// conflict-free team becomes a non-decreasing run of scores.
	sort.Slice(order, func(a, b int) bool {
		i, j := order[a], order[b]
		if ages[i] != ages[j] {
			return ages[i] < ages[j]
		}
		return scores[i] < scores[j]
	})

	sortedScores := make([]int, n)
	for i, idx := range order {
		sortedScores[i] = scores[idx]
	}

	// dp[i] = best total for a team ending at player i (in sorted order).
	dp := make([]int, n)
	best := 0
	for i := 0; i < n; i++ {
		dp[i] = sortedScores[i]
		for j := 0; j < i; j++ {
			if sortedScores[j] <= sortedScores[i] {
				candidate := dp[j] + sortedScores[i]
				if candidate > dp[i] {
					dp[i] = candidate
				}
			}
		}
		if dp[i] > best {
			best = dp[i]
		}
	}
	return best
}
