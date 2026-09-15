// The operation is forced: merge the minimum-sum adjacent pair, leftmost
// on ties, until the array is non-decreasing. Just simulate -- with
// n <= 50 a full rescan per step is trivial.
func minimumPairRemoval(nums []int) int {
	arr := append([]int(nil), nums...)
	ops := 0
	isSorted := func() bool {
		for i := 1; i < len(arr); i++ {
			if arr[i-1] > arr[i] {
				return false
			}
		}
		return true
	}
	for !isSorted() {
		best := 0
		for i := 1; i+1 < len(arr); i++ {
			if arr[i]+arr[i+1] < arr[best]+arr[best+1] {
				best = i
			}
		}
		// strict < keeps the earliest of equal-sum pairs
		arr[best] += arr[best+1]
		arr = append(arr[:best+1], arr[best+2:]...)
		ops++
	}
	return ops
}
