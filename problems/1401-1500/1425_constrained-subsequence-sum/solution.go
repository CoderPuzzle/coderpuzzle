import "math"

func constrainedSubsetSum(nums []int, k int) int {
	n := len(nums)
	dp := make([]int64, n)
	dq := make([]int, n)
	head, tail := 0, 0
	best := int64(math.MinInt64)
	for i := 0; i < n; i++ {
		for head < tail && dq[head] < i-k {
			head++
		}
		prev := int64(0)
		if head < tail {
			prev = dp[dq[head]]
		}
		if prev < 0 {
			prev = 0
		}
		dp[i] = int64(nums[i]) + prev
		for head < tail && dp[dq[tail-1]] <= dp[i] {
			tail--
		}
		dq[tail] = i
		tail++
		if dp[i] > best {
			best = dp[i]
		}
	}
	return int(best)
}
