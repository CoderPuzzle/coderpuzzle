// Suffix costs, built right to left: cost[i] is the cheapest total for the
// rest of the walk when standing on i, coins[i] included, while unreachable
// marks blocked or stranded cells and is never added to. Scanning the window
// i+1..i+maxJump in increasing index order and replacing the best only on a
// strict improvement leaves next[i] at the smallest index achieving the
// minimum continuation, so the lexicographic tie rule is stored in the table
// itself.
func cheapestJump(coins []int, maxJump int) []int {
	const unreachable = 101*1000 + 1
	n := len(coins)
	cost := make([]int, n)
	next := make([]int, n)
	for i := range cost {
		cost[i] = unreachable
		next[i] = -1
	}
	if coins[n-1] != -1 {
		cost[n-1] = coins[n-1]
	}
	for i := n - 2; i >= 0; i-- {
		if coins[i] == -1 {
			continue
		}
		best := unreachable
		bestFrom := -1
		limit := i + maxJump
		if limit > n-1 {
			limit = n - 1
		}
		for j := i + 1; j <= limit; j++ {
			if cost[j] < best {
				best = cost[j]
				bestFrom = j
			}
		}
		if bestFrom != -1 {
			cost[i] = coins[i] + best
			next[i] = bestFrom
		}
	}
	// make (never a nil slice) so an unreachable answer marshals as [] not
	// null; the walk from index 1 follows next[] and is the lexicographically
	// smallest minimum-cost path — at every divergence between two equal-cost
	// optimal paths the smaller next index wins outright, whatever the
	// remaining suffixes do.
	path := make([]int, 0, n)
	if cost[0] != unreachable {
		for i := 0; i != -1; i = next[i] {
			path = append(path, i+1)
		}
	}
	return path
}
