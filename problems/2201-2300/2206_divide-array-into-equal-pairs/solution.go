// Values are bounded to [1, 500], so a fixed counting table answers "is
// every value's occurrence count even?" in one pass.
func divideArray(nums []int) bool {
	counts := make([]int, 501)
	for _, value := range nums {
		counts[value]++
	}
	for _, count := range counts {
		if count%2 != 0 {
			return false
		}
	}
	return true
}
