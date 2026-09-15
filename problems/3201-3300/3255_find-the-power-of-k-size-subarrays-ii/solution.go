func resultsArray(nums []int, k int) []int {
	n := len(nums)
	results := make([]int, n-k+1)
	run := 1
	for i := 0; i < n; i++ {
		if i > 0 && nums[i] == nums[i-1]+1 {
			run++
		} else {
			run = 1
		}
		if i >= k-1 {
			if run >= k {
				results[i-k+1] = nums[i]
			} else {
				results[i-k+1] = -1
			}
		}
	}
	return results
}
