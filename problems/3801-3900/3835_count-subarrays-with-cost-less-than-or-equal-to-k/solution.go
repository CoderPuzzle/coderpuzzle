// Bounds: (max-min) <= 10^9-1 and length <= 10^5, so every cost is
// < 10^14; the answer is at most n(n+1)/2 ~ 5*10^9 — both live
// comfortably in an int64.
func countSubarrays(nums []int, k int64) int64 {
	n := len(nums)
	maxQ := make([]int, n) // indices of max candidates, values decreasing
	minQ := make([]int, n) // indices of min candidates, values increasing
	maxHead, maxTail := 0, 0
	minHead, minTail := 0, 0
	var ans int64
	left := 0
	for right, x := range nums {
		for maxHead < maxTail && nums[maxQ[maxTail-1]] <= x {
			maxTail--
		}
		maxQ[maxTail] = right
		maxTail++
		for minHead < minTail && nums[minQ[minTail-1]] >= x {
			minTail--
		}
		minQ[minTail] = right
		minTail++
		// Growing the window only raises max, lowers min and lengthens the
		// window, so cost is non-decreasing in window size: shrink from the
		// left while invalid, then every subarray ending at right with left
		// endpoint >= left is valid — right-left+1 of them. A single element
		// costs 0 <= k, so the loop stops.
		for int64(nums[maxQ[maxHead]]-nums[minQ[minHead]])*int64(right-left+1) > k {
			if maxQ[maxHead] == left {
				maxHead++
			}
			if minQ[minHead] == left {
				minHead++
			}
			left++
		}
		ans += int64(right - left + 1)
	}
	return ans
}
