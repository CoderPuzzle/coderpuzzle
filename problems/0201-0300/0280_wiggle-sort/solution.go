// One pass: each pair demands its own relation, and repairing a
// violated pair with a single swap never re-breaks the pair before it.
func wiggleSort(nums []int) []int {
	for i := 1; i < len(nums); i++ {
		// Odd i demands nums[i-1] <= nums[i]; even i demands nums[i-1] >= nums[i].
		if i%2 == 1 && nums[i-1] > nums[i] || i%2 == 0 && nums[i-1] < nums[i] {
			nums[i-1], nums[i] = nums[i], nums[i-1]
		}
	}
	return nums
}
