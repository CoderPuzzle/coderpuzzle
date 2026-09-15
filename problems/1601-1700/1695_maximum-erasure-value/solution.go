// Erasing one all-distinct subarray for the highest score is a search for
// the maximum-sum window with no repeated value. Sweep the right end
// forward, and while the incoming value is already inside the window,
// retire elements from the left, dropping their sum. Values lie in
// [1, 10^4], so a flat count array spots the repeat in constant time, and
// because every value is positive the longest distinct window ending at
// each right end is also the richest one there. The total can reach
// 10^5 * 10^4 = 10^9, barely inside 32 bits, which Go's 64-bit int
// carries without widening.
func maximumUniqueSubarray(nums []int) int {
	freq := make([]int, 10001)
	left := 0
	windowSum := 0
	best := 0
	for _, value := range nums {
		for freq[value] > 0 {
			freq[nums[left]]--
			windowSum -= nums[left]
			left++
		}
		freq[value]++
		windowSum += value
		best = max(best, windowSum)
	}
	return best
}
