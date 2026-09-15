func minimumMoney(transactions [][]int) int64 {
	totalLose := int64(0)
	maxCashbackLosing := int64(0)
	maxCostWinning := int64(0)
	for _, t := range transactions {
		cost := int64(t[0])
		cashback := int64(t[1])
		// losers (cashback < cost) drain money permanently; winners don't
		if cashback < cost {
			// losers' total drain is fixed regardless of ordering
			totalLose += cost - cashback
			// worst order: largest-cashback loser goes last, after every
			// other drain, yet its full cost must still be covered
			if cashback > maxCashbackLosing {
				maxCashbackLosing = cashback
			}
		} else {
			// winners only matter via their largest upfront cost, paid at
			// the lowest-funds point (right after the losing block)
			if cost > maxCostWinning {
				maxCostWinning = cost
			}
		}
	}
	// answer = totalLose + max(last loser's cashback, top winner's cost)
	return totalLose + max64(maxCashbackLosing, maxCostWinning)
}

func max64(a, b int64) int64 {
	if a > b {
		return a
	}
	return b
}
