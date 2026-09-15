import "math"

func maximumProduct(nums []int) int {
	// Only two triples can hold the maximum: the three largest values, or
	// the largest value times the two smallest — two negatives whose
	// product is a big positive. Track all five extremes in one pass; no
	// sort needed.
	max1, max2, max3 := math.MinInt, math.MinInt, math.MinInt
	min1, min2 := math.MaxInt, math.MaxInt
	for _, value := range nums {
		if value >= max1 {
			max3, max2, max1 = max2, max1, value
		} else if value >= max2 {
			max3, max2 = max2, value
		} else if value > max3 {
			max3 = value
		}
		if value <= min1 {
			min2, min1 = min1, value
		} else if value < min2 {
			min2 = value
		}
	}
	// n >= 3 replaces every sentinel, and three values bounded by 1000 in
	// magnitude keep each candidate within 10^9 — inside 32-bit range — and
	// Go's int is 64-bit on every judge platform anyway.
	top := max1 * max2 * max3
	spread := min1 * min2 * max1
	return max(top, spread)
}
