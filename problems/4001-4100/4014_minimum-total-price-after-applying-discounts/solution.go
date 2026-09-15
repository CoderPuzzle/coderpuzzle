import "sort"

func minPrice(prices []int, discounts []int) float64 {
	// Sort both descending and pair positionally: by the exchange
	// argument, largest discount on largest price maximizes p*d/100.
	sort.Slice(prices, func(a, b int) bool { return prices[a] > prices[b] })
	sort.Slice(discounts, func(a, b int) bool { return discounts[a] > discounts[b] })
	var saved int64
	var total int64
	for i := range prices {
		total += int64(prices[i])
		if i < len(discounts) {
			saved += int64(prices[i]) * int64(discounts[i])
		}
	}
	// The product sum reaches 1e12 in the int64; dividing once yields
	// the correctly rounded double of the rational total.
	return float64(total*100-saved) / 100.0
}
