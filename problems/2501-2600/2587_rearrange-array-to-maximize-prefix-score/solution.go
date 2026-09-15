import "sort"

// In descending order the first k elements are always the k largest
// values, so every prefix sum is simultaneously maximal across all
// rearrangements; counting positive running totals is optimal. Totals
// reach ±10^11, hence the int64 accumulator.
func maxScore(nums []int) int {
	sort.Slice(nums, func(i, j int) bool { return nums[i] > nums[j] })
	total := int64(0)
	score := 0
	for _, value := range nums {
		total += int64(value)
		if total > 0 {
			score++
		}
	}
	return score
}
