import "math"

func maxProduct(nums []int) int64 {
	// One sweep keeps the two largest and the two smallest values. Those
	// four slots always contain the two elements of largest magnitude:
	// absolute values are V-shaped across a sorted array, so both winners
	// come off its ends.
	max1, max2 := math.MinInt64, math.MinInt64
	min1, min2 := math.MaxInt64, math.MaxInt64
	for _, value := range nums {
		if value > max1 {
			max2, max1 = max1, value
		} else if value > max2 {
			max2 = value
		}
		if value < min1 {
			min2, min1 = min1, value
		} else if value < min2 {
			min2 = value
		}
	}
	// The optimal triple is the mandatory replacement pushed to +-10^5 (its
	// sign matched to the pair) times the most extreme pair product.
	extremes := [4]int{max1, max2, min1, min2}
	bestPair := int64(0)
	for i := 0; i < 4; i++ {
		for j := i + 1; j < 4; j++ {
			pair := int64(extremes[i]) * int64(extremes[j])
			if pair < 0 {
				pair = -pair
			}
			if pair > bestPair {
				bestPair = pair
			}
		}
	}
	return 100000 * bestPair
}
