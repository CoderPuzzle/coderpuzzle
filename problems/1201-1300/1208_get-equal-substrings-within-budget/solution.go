func equalSubstring(s string, t string, maxCost int) int {
	// cost[i] = |s[i] - t[i]|; find the longest subarray of costs whose sum
	// stays at most maxCost. A sliding window keeps one pass.
	n := len(s)
	costs := make([]int, n)
	for i := 0; i < n; i++ {
		costs[i] = absInt(int(s[i]) - int(t[i]))
	}
	left, windowCost, best := 0, 0, 0
	for right := 0; right < n; right++ {
		windowCost += costs[right]
		// Non-negative costs: shrink from the left until affordable.
		for windowCost > maxCost {
			windowCost -= costs[left]
			left++
		}
		if right-left+1 > best {
			best = right - left + 1
		}
	}
	return best
}

func absInt(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
