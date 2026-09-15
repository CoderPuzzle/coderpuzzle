func minimumOperations(nums []int) int {
	values := map[int]bool{}
	for _, num := range nums {
		if num > 0 {
			values[num] = true
		}
	}
	return len(values)
}
