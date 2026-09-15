import "sort"

func countElements(nums []int, k int) int {
	// Sorting lines every element up with its rank: the elements strictly
	// greater than a value are exactly the sorted suffix after that
	// value's run. The whole count hangs on one threshold, the value at
	// sorted index t = n - k - 1.
	ordered := append([]int(nil), nums...)
	sort.Ints(ordered)
	n := len(ordered)
	threshold := ordered[n-k-1]
	// Elements strictly below the threshold all qualify: their runs end
	// before it. The run AT the threshold qualifies only when its last
	// member still sees >= k strictly greater values, i.e. the run ends
	// at or before t. Values above the threshold never qualify.
	left := sort.SearchInts(ordered, threshold)
	right := sort.SearchInts(ordered, threshold+1)
	if n-right >= k {
		return right
	}
	return left
}
