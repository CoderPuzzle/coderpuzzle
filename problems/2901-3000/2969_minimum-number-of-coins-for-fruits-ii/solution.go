func minimumCoins(prices []int) int {
	n := len(prices)
	dp := make([]int64, n+1)
	dq := make([]int, 0, n+1)
	head := 0

	value := func(l int) int64 {
		return dp[l-1] + int64(prices[l-1])
	}

	for i := 1; i <= n; i++ {
		for len(dq) > head && value(dq[len(dq)-1]) >= value(i) {
			dq = dq[:len(dq)-1]
		}
		dq = append(dq, i)
		lo := (i + 1) / 2 // ceil(i / 2)
		for len(dq) > head && dq[head] < lo {
			head++
		}
		dp[i] = value(dq[head])
	}
	return int(dp[n])
}
