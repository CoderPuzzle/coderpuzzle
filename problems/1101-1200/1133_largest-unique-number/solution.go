func largestUniqueNumber(nums []int) int {
	var counts [1001]int
	for _, value := range nums {
		counts[value]++
	}
	// Walk downward so the first singleton found is the largest.
	for value := 1000; value >= 0; value-- {
		if counts[value] == 1 {
			return value
		}
	}
	return -1
}
