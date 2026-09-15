// Sweep i from the right; freq counts occurrences of each value in
// the window [i + k + 1, n - 1], so stepping i down inserts exactly
// nums[i + k + 1] and the delayed count is a single lookup.
func delayedCount(nums []int, k int) []int {
	n := len(nums)
	ans := make([]int, n)
	freq := make(map[int]int)
	for i := n - 1; i >= 0; i-- {
		ahead := i + k + 1
		if ahead < n {
			freq[nums[ahead]]++
		}
		ans[i] = freq[nums[i]]
	}
	return ans
}
