func maxValue(nums []int, k int) int {
	n := len(nums)
	const V = 128 // nums[i] < 2^7, OR values stay below 128

	// pre[j] = ORs of exactly k elements from first j elements
	pre := make([][]bool, n+1)
	{
		dp := make([][]bool, k+1)
		for c := range dp {
			dp[c] = make([]bool, V)
		}
		dp[0][0] = true
		for i := 0; i < n; i++ {
			x := nums[i]
			top := i + 1
			if k < top {
				top = k
			}
			for c := top; c >= 1; c-- {
				src := dp[c-1]
				dst := dp[c]
				for m := 0; m < V; m++ {
					if src[m] {
						dst[m|x] = true
					}
				}
			}
			snapshot := make([]bool, V)
			copy(snapshot, dp[k])
			pre[i+1] = snapshot
		}
	}

	// suf[i] = ORs of exactly k elements from nums[i:]
	suf := make([][]bool, n+1)
	{
		dp := make([][]bool, k+1)
		for c := range dp {
			dp[c] = make([]bool, V)
		}
		dp[0][0] = true
		for i := n - 1; i >= 0; i-- {
			x := nums[i]
			top := n - i
			if k < top {
				top = k
			}
			for c := top; c >= 1; c-- {
				src := dp[c-1]
				dst := dp[c]
				for m := 0; m < V; m++ {
					if src[m] {
						dst[m|x] = true
					}
				}
			}
			snapshot := make([]bool, V)
			copy(snapshot, dp[k])
			suf[i] = snapshot
		}
	}

	ans := 0
	for i := k; i <= n-k; i++ {
		a := pre[i]
		b := suf[i]
		for x := 0; x < V; x++ {
			if !a[x] {
				continue
			}
			for y := 0; y < V; y++ {
				if b[y] {
					if v := x ^ y; v > ans {
						ans = v
					}
				}
			}
		}
	}
	return ans
}
