func buyChoco(prices []int, money int) int {
	// The cheapest pair is the two smallest prices; one pass tracks
	// them without sorting.
	first, second := 101, 101
	for _, price := range prices {
		if price < first {
			first, second = price, first
		} else if price < second {
			second = price
		}
	}
	if first+second > money {
		return money
	}
	return money - first - second
}
