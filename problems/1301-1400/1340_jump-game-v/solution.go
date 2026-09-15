import "sort"

func maxJumps(arr []int, d int) int {
	// Process indices in increasing height order: every one-jump target is
	// strictly lower, so its dp value is already final when needed.
	n := len(arr)
	order := make([]int, n)
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(a, b int) bool { return arr[order[a]] < arr[order[b]] })
	dp := make([]int, n)
	for i := range dp {
		dp[i] = 1
	}
	for _, i := range order {
		for j := i + 1; j < n && j-i <= d && arr[j] < arr[i]; j++ {
			if 1+dp[j] > dp[i] {
				dp[i] = 1 + dp[j]
			}
		}
		for j := i - 1; j >= 0 && i-j <= d && arr[j] < arr[i]; j-- {
			if 1+dp[j] > dp[i] {
				dp[i] = 1 + dp[j]
			}
		}
	}
	best := 0
	for _, value := range dp {
		if value > best {
			best = value
		}
	}
	return best
}
