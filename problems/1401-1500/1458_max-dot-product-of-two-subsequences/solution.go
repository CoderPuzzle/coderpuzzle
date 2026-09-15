func maxDotProduct(nums1 []int, nums2 []int) int {
	n, m := len(nums1), len(nums2)
	NEG := -(1 << 62)
	dp := make([][]int, n+1)
	for i := range dp {
		dp[i] = make([]int, m+1)
		for j := range dp[i] {
			dp[i][j] = NEG
		}
	}
	for i := n - 1; i >= 0; i-- {
		for j := m - 1; j >= 0; j-- {
			pair := nums1[i] * nums2[j]
			tail := dp[i+1][j+1]
			if tail < 0 {
				tail = 0
			}
			best := pair + tail
			if dp[i+1][j] > best {
				best = dp[i+1][j]
			}
			if dp[i][j+1] > best {
				best = dp[i][j+1]
			}
			dp[i][j] = best
		}
	}
	return dp[0][0]
}
