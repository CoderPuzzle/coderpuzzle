func largestNumber(cost []int, target int) string {
	dp := make([]int, target+1)
	for t := 1; t <= target; t++ {
		dp[t] = -1
	}
	for t := 1; t <= target; t++ {
		for _, c := range cost {
			if c <= t && dp[t-c] != -1 && dp[t-c]+1 > dp[t] {
				dp[t] = dp[t-c] + 1
			}
		}
	}
	if dp[target] == -1 {
		return "0"
	}
	result := make([]byte, 0, dp[target])
	remaining := target
	for remaining > 0 {
		for digit := 9; digit >= 1; digit-- {
			c := cost[digit-1]
			if c <= remaining && dp[remaining-c] == dp[remaining]-1 {
				result = append(result, byte('0'+digit))
				remaining -= c
				break
			}
		}
	}
	return string(result)
}
