func lenLongestFibSubseq(arr []int) int {
	n := len(arr)
	indexOf := make(map[int]int)
	for i, v := range arr {
		indexOf[v] = i
	}
	// dp[j][i] = longest Fibonacci-like subsequence ending with arr[j], arr[i]
	dp := make([][]int, n)
	for j := range dp {
		dp[j] = make([]int, n)
		for i := range dp[j] {
			dp[j][i] = 2
		}
	}
	best := 0
	for i := 0; i < n; i++ {
		for j := 0; j < i; j++ {
			need := arr[i] - arr[j]
			if need < arr[j] {
				if k, ok := indexOf[need]; ok {
					dp[j][i] = dp[k][j] + 1
					if dp[j][i] > best {
						best = dp[j][i]
					}
				}
			}
		}
	}
	if best >= 3 {
		return best
	}
	return 0
}
