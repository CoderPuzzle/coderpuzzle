import "sort"

// A permutation of base[m] has maximum m and length m+1, so the maximum
// leaves exactly one candidate array to match: sort a copy of nums and
// compare it against the literally constructed [1, ..., m-1, m, m]. For
// m=1 the ascending range is empty and the expected array is just [1, 1],
// which is base[1] itself.
func isGood(nums []int) bool {
	largest := 0
	for _, value := range nums {
		if value > largest {
			largest = value
		}
	}
	if len(nums) != largest+1 {
		// base[m] has length m+1; a disagreement rules out every base.
		return false
	}
	sortedNums := append([]int(nil), nums...)
	sort.Ints(sortedNums)
	expected := make([]int, 0, largest+1)
	for value := 1; value < largest; value++ {
		expected = append(expected, value)
	}
	expected = append(expected, largest, largest)
	for index, value := range sortedNums {
		if value != expected[index] {
			return false
		}
	}
	return true
}
