import "sort"

// Each round hands Alice the round's smallest value and Bob the next
// smallest, but Bob appends first — so the sorted array with every adjacent
// pair swapped is exactly arr.
func numberGame(nums []int) []int {
	arr := append([]int{}, nums...)
	sort.Ints(arr)
	for i := 0; i+1 < len(arr); i += 2 {
		arr[i], arr[i+1] = arr[i+1], arr[i]
	}
	return arr
}
