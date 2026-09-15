// Suffixes of a distinct array stay distinct, so the surviving tail is
// nums[j:] for the smallest j whose suffix is duplicate-free. Scanning
// right-to-left, that j is one past the first value that repeats inside the
// tail; each operation removes 3 front elements.
func minimumOperations(nums []int) int {
	seen := make(map[int]bool)
	j := 0
	for i := len(nums) - 1; i >= 0; i-- {
		if seen[nums[i]] {
			j = i + 1
			break
		}
		seen[nums[i]] = true
	}
	return (j + 2) / 3
}
