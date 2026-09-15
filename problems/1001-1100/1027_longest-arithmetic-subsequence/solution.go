func longestArithSeqLength(nums []int) int {
	n := len(nums)
	dp := make([]map[int]int, n)
	best := 1
	for i := 0; i < n; i++ {
		dp[i] = make(map[int]int)
		for j := 0; j < i; j++ {
			d := nums[i] - nums[j]
			length := dp[j][d] + 1
			if _, ok := dp[j][d]; !ok {
				length = 2
			}
			if length > dp[i][d] {
				dp[i][d] = length
				if length > best {
					best = length
				}
			}
		}
	}
	return best
}
