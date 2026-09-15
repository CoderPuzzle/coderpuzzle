// Deletions are free, so the chosen subarray is really a set of distinct
// values: keep every positive value once, and when no positive exists the
// best set is the single largest element.
func maxSum(nums []int) int {
	seen := make(map[int]bool)
	total := 0
	largest := nums[0]
	for _, v := range nums {
		if v > largest {
			largest = v
		}
		if v > 0 && !seen[v] {
			seen[v] = true
			total += v
		}
	}
	if len(seen) > 0 {
		return total
	}
	return largest
}
