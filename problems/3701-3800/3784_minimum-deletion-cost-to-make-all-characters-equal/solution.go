func minCost(s string, cost []int) int64 {
	var totals [26]int64
	for i := 0; i < len(s); i++ {
		totals[s[i]-'a'] += int64(cost[i])
	}
	var sum int64
	var best int64
	for _, t := range totals {
		sum += t
		if t > best {
			best = t
		}
	}
	return sum - best
}
