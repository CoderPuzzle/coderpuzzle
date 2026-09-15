func smallestSubarrays(nums []int) []int {
	// One pass per bit, right to left: `last` is the nearest index at or
	// after i whose number carries that bit. The OR of nums[i..j] is
	// maximal exactly when j reaches the farthest such index over all
	// bits of the suffix OR, so answer[i] is the largest gap.
	n := len(nums)
	answer := make([]int, n)
	for i := range answer {
		answer[i] = 1
	}
	for bit := 0; bit < 30; bit++ {
		last := -1
		for i := n - 1; i >= 0; i-- {
			if nums[i]>>bit&1 == 1 {
				last = i
			}
			if last != -1 && last-i+1 > answer[i] {
				answer[i] = last - i + 1
			}
		}
	}
	return answer
}
