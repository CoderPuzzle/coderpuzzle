func timeRequiredToBuy(tickets []int, k int) int {
	target := tickets[k]
	elapsed := 0
	for index, count := range tickets {
		limit := target
		if index > k {
			limit--
		}
		if count < limit {
			elapsed += count
		} else {
			elapsed += limit
		}
	}
	return elapsed
}
