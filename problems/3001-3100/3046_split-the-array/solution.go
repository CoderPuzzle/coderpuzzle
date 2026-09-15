func isPossibleToSplit(nums []int) bool {
	frequencies := make(map[int]int)
	for _, num := range nums {
		frequencies[num]++
		if frequencies[num] > 2 {
			return false
		}
	}
	return true
}
