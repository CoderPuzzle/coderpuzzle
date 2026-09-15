// Counting sort: tally each price, then sweep prices from cheapest.
// Buying cheapest-first is optimal, and the tally makes that walk
// O(max_price) instead of O(n log n).
func maxIceCream(costs []int, coins int) int {
	count := make([]int, 100001)
	for _, c := range costs {
		count[c]++
	}
	bought := 0
	for price := 1; price <= 100000; price++ {
		if count[price] == 0 || price > coins {
			continue
		}
		afford := count[price]
		if coins/price < afford {
			afford = coins / price
		}
		bought += afford
		coins -= afford * price
		if coins == 0 {
			break
		}
	}
	return bought
}
