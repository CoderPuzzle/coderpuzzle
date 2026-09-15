func numOfPairs(nums []string, target string) int {
	pairs := 0
	for first := range nums {
		for second := range nums {
			if first != second && nums[first]+nums[second] == target {
				pairs++
			}
		}
	}
	return pairs
}
