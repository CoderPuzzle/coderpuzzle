func transformArray(nums []int) []int {
	// After the parity replacement every entry is 0 or 1, so the sorted
	// result is just zeros for the evens followed by ones for the odds.
	ones := 0
	for _, x := range nums {
		ones += x & 1
	}
	result := make([]int, len(nums)-ones)
	for i := 0; i < ones; i++ {
		result = append(result, 1)
	}
	return result
}
