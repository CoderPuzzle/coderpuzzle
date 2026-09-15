const infCost = 1_000_000

// connectTwoGroups runs a forward bitmask DP over how many first-group
// points have been placed and which second-group points they have reached
// so far, then force-connects any second-group point the forward pass never
// touched at its own cheapest edge from any first-group point.
func connectTwoGroups(cost [][]int) int {
	size1, size2 := len(cost), len(cost[0])
	full := 1 << size2

	minToReach := make([]int, size2)
	for j := 0; j < size2; j++ {
		best := infCost
		for i := 0; i < size1; i++ {
			if cost[i][j] < best {
				best = cost[i][j]
			}
		}
		minToReach[j] = best
	}

	dp := make([]int, full)
	for mask := 0; mask < full; mask++ {
		total := 0
		for j := 0; j < size2; j++ {
			if (mask>>j)&1 == 0 {
				total += minToReach[j]
			}
		}
		dp[mask] = total
	}

	for i := size1 - 1; i >= 0; i-- {
		next := make([]int, full)
		for mask := 0; mask < full; mask++ {
			best := infCost
			for j := 0; j < size2; j++ {
				candidate := cost[i][j] + dp[mask|(1<<j)]
				if candidate < best {
					best = candidate
				}
			}
			next[mask] = best
		}
		dp = next
	}

	return dp[0]
}
