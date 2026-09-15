func countKDifference(nums []int, k int) int {
	pairs := 0
	for first := 0; first < len(nums); first++ {
		for second := first + 1; second < len(nums); second++ {
			difference := nums[first] - nums[second]
			if difference < 0 {
				difference = -difference
			}
			if difference == k {
				pairs++
			}
		}
	}
	return pairs
}
