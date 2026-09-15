import "sort"

func findScore(nums []int) int64 {
	// Visit candidates in (value, index) order once; the first
	// not-yet-marked visit of each position is exactly the statement's
	// "smallest unmarked, smallest index" pick, and its neighborhood is
	// marked on the spot, so later sorted candidates skip it naturally.
	// Chosen indices are pairwise non-adjacent, so at most ceil(n / 2)
	// values of up to 10^6 are summed — under 5 * 10^10, which is why
	// the score rides in an int64.
	n := len(nums)
	order := make([]int, n)
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(a, b int) bool {
		if nums[order[a]] != nums[order[b]] {
			return nums[order[a]] < nums[order[b]]
		}
		return order[a] < order[b]
	})
	marked := make([]bool, n)
	var score int64
	for _, i := range order {
		if marked[i] {
			continue
		}
		score += int64(nums[i])
		marked[i] = true
		if i > 0 {
			marked[i-1] = true
		}
		if i+1 < n {
			marked[i+1] = true
		}
	}
	return score
}
