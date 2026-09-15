// A lonely value appears exactly once and has neither neighbour x - 1 nor
// x + 1 present; scanning nums in order keeps the output in first-occurrence
// order.
func findLonely(nums []int) []int {
	count := make(map[int]int, len(nums))
	for _, x := range nums {
		count[x]++
	}
	// Allocated non-nil so an empty answer serializes as [], not null.
	lonely := make([]int, 0)
	for _, x := range nums {
		if count[x] == 1 && count[x-1] == 0 && count[x+1] == 0 {
			lonely = append(lonely, x)
		}
	}
	return lonely
}
