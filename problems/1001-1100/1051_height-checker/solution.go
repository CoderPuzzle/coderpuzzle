import "sort"

// The expected order is just heights sorted into non-decreasing order.
// Compare position-by-position and count every mismatch.
func heightChecker(heights []int) int {
	expected := make([]int, len(heights))
	copy(expected, heights)
	sort.Ints(expected)
	count := 0
	for i, h := range heights {
		if h != expected[i] {
			count++
		}
	}
	return count
}
