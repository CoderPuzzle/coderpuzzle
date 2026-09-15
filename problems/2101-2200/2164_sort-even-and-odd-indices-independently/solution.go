import "sort"

func sortEvenOdd(nums []int) []int {
	// Strides 2 and 1-from-2 split the array by index parity; sorting
	// each slice its own direction and writing back through the same
	// strides re-interleaves them without touching positions.
	evens := make([]int, 0, (len(nums)+1)/2)
	odds := make([]int, 0, len(nums)/2)
	for index, value := range nums {
		if index%2 == 0 {
			evens = append(evens, value)
		} else {
			odds = append(odds, value)
		}
	}
	sort.Ints(evens)
	sort.Sort(sort.Reverse(sort.IntSlice(odds)))
	result := make([]int, len(nums))
	copy(result, nums)
	for index, value := range evens {
		result[2*index] = value
	}
	for index, value := range odds {
		result[2*index+1] = value
	}
	return result
}
