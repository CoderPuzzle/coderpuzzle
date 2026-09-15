// run[i] = length of the strictly increasing run ending at i. The window
// ending at i is strictly increasing exactly when run[i] is at least k, so
// two adjacent windows end k apart and both qualify when run[i] and
// run[i-k] both reach k.
func hasIncreasingSubarrays(nums []int, k int) bool {
	n := len(nums)
	run := make([]int, n)
	for i := range run {
		run[i] = 1
	}
	for i := 1; i < n; i++ {
		if nums[i] > nums[i-1] {
			run[i] = run[i-1] + 1
		}
	}
	for i := 2*k - 1; i < n; i++ {
		if run[i] >= k && run[i-k] >= k {
			return true
		}
	}
	return false
}
