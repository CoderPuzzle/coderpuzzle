// Distinct values mean two length-k windows never tie: their first
// elements differ, and the comparison is decided at index 0 by that
// pair alone. The answer is therefore the window starting at the
// maximum of nums[0..n-k] — one scan for that position, then take
// the k elements from it.
func largestSubarray(nums []int, k int) []int {
	best := 0
	for i := 1; i+k <= len(nums); i++ {
		if nums[i] > nums[best] {
			best = i
		}
	}
	return nums[best : best+k]
}
