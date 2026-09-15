import "sort"

// The chosen subsequence must sum to more than half the total. Every
// element is positive, so taking the largest elements first yields the
// minimum size and, per size, the maximum sum.
func minSubsequence(nums []int) []int {
	sort.Sort(sort.Reverse(sort.IntSlice(nums)))
	total := 0
	for _, value := range nums {
		total += value
	}
	running := 0
	for i, value := range nums {
		running += value
		if running*2 > total {
			result := make([]int, i+1)
			copy(result, nums[:i+1])
			return result
		}
	}
	return nums
}
