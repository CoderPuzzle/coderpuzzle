// Scores grow with every extension: appending x to a window with sum s and
// length l changes the score by s + x*l + x > 0 (all elements are >= 1), so
// valid windows for a fixed right endpoint form a suffix that only shrinks
// as right advances. The sum reaches n * max = 10^10, past int32 range, so
// it is widened to int64 on entry; no score exceeds 10^10 * 10^5 = 10^15,
// far below the ~9.2 * 10^18 int64 ceiling.
func countSubarrays(nums []int, k int64) int64 {
	var total int64
	var windowSum int64
	left := 0
	for right := 0; right < len(nums); right++ {
		windowSum += int64(nums[right])
		for windowSum*int64(right-left+1) >= k {
			windowSum -= int64(nums[left])
			left++
		}
		// The window is now the longest qualifying subarray ending at
		// right; every shorter suffix qualifies too.
		total += int64(right - left + 1)
	}
	return total
}
