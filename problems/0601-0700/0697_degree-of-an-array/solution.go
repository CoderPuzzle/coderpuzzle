// The degree is a maximum frequency, and a window reaches it only by
// holding every copy of some value at that frequency: drop one copy and
// that value falls short. One pass records each value's count, first
// index, and last index; the answer is then the tightest first-to-last
// span among the values whose count equals the degree.
func findShortestSubArray(nums []int) int {
	count := map[int]int{}
	first := map[int]int{}
	last := map[int]int{}
	for index, value := range nums {
		count[value]++
		if _, seen := first[value]; !seen {
			first[value] = index
		}
		last[value] = index
	}
	degree, best := 0, len(nums)
	for _, freq := range count {
		degree = max(degree, freq)
	}
	for value, freq := range count {
		if freq == degree {
			if span := last[value] - first[value] + 1; span < best {
				best = span
			}
		}
	}
	return best
}
