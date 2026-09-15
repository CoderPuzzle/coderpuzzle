func maxValueOfCoins(piles [][]int, k int) int {
	// dp[j]: best value using exactly j coins from the piles seen so far
	dp := make([]int, k+1)
	for _, pile := range piles {
		// taking t coins from a pile means its top t: prefix[t]
		prefix := make([]int, len(pile)+1)
		for i, coin := range pile {
			prefix[i+1] = prefix[i] + coin
		}
		// t stays within both the pile's size and the budget
		takeMax := len(pile)
		if takeMax > k {
			takeMax = k
		}
		// fresh row so transitions only read the previous pile's dp
		ndp := make([]int, k+1)
		for j := 0; j <= k; j++ {
			// t = 0 case: skip this pile entirely
			value := dp[j]
			lim := takeMax
			if lim > j {
				lim = j
			}
			for t := 1; t <= lim; t++ {
				cand := dp[j-t] + prefix[t]
				if cand > value {
					value = cand
				}
			}
			ndp[j] = value
		}
		dp = ndp
	}
	// coin values are positive, so using all k coins is never worse
	return dp[k]
}
