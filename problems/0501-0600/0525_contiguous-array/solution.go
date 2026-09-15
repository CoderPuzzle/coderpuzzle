// Treat 0 as -1 and 1 as +1 and carry the running balance: equal counts
// cancel, so a repeated balance at i < j bounds an equal-count subarray of
// length j - i. Keep only the FIRST index of each balance (0 seeded at -1)
// so every repeat stretches its window as far as possible.
func findMaxLength(nums []int) int {
	first := map[int]int{0: -1}
	best, balance := 0, 0
	for index, value := range nums {
		if value == 1 {
			balance++
		} else {
			balance--
		}
		if earlier, seen := first[balance]; seen {
			best = max(best, index-earlier)
		} else {
			first[balance] = index
		}
	}
	return best
}
