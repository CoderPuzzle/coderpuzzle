func minOperations(nums []int) int {
	counts := map[int]int{}
	for _, num := range nums {
		counts[num]++
	}
	operations := 0
	for _, count := range counts {
		if count == 1 {
			return -1
		}
		operations += (count + 2) / 3
	}
	return operations
}
