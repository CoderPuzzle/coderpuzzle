import "sort"

// After sorting, each element can be raised to at most one more than the
// previous; the answer is the running value min(prev + 1, v).
func maximumElementAfterDecrementingAndRearranging(arr []int) int {
	sort.Ints(arr)
	cur := 1
	for _, v := range arr[1:] {
		if cur+1 < v {
			v = cur + 1
		}
		cur = v
	}
	return cur
}
