func getSneakyNumbers(nums []int) []int {
	// Values all lie in 0..n-1, so a counter array indexed by value finds
	// the two count-2 entries; the ascending walk emits them in order.
	n := len(nums) - 2
	count := make([]int, n)
	for _, x := range nums {
		count[x]++
	}
	sneaky := []int{}
	for v := 0; v < n; v++ {
		if count[v] == 2 {
			sneaky = append(sneaky, v)
		}
	}
	return sneaky
}
