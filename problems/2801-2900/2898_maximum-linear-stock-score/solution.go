func maxScore(prices []int) int64 {
	// prices[indexes[j]] - prices[indexes[j - 1]] == indexes[j] -
	// indexes[j - 1] rearranges to prices[i] - i equal on consecutive picks,
	// so every linear selection lives inside one offset group and any subset
	// of one group is linear.  Every price is >= 1, so the best subset of a
	// group is the whole group; the answer is the largest group total.  It is
	// bounded by 10^5 * 10^9 = 10^14, which is why it rides in an int64.
	groupSum := make(map[int]int64)
	var best int64
	for day, price := range prices {
		total := groupSum[price-day-1] + int64(price)
		groupSum[price-day-1] = total
		if total > best {
			best = total
		}
	}
	return best
}
