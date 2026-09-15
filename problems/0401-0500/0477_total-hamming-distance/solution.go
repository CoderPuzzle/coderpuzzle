// A pair differs at a bit position exactly when one value has the bit set
// and the other does not. If c of the n values carry the bit, the position
// therefore contributes c * (n - c) differing pairs, and summing that over
// all positions counts every (pair, bit) difference exactly once. Values
// are at most 10^9, below 2^30, so 31 fixed passes cover every position
// that can ever hold a set bit.
func totalHammingDistance(nums []int) int {
	n := len(nums)
	total := 0
	for bit := 0; bit < 31; bit++ {
		setCount := 0
		for _, value := range nums {
			setCount += (value >> bit) & 1
		}
		total += setCount * (n - setCount)
	}
	return total
}
