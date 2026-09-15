func findClosestElements(arr []int, k int, x int) []int {
	// The k closest elements form a contiguous block, so binary search the
	// block's start over [0, n-k].
	lo, hi := 0, len(arr)-k
	for lo < hi {
		mid := lo + (hi-lo)/2
		// Compare the kept left edge arr[mid] with arr[mid+k], the first
		// excluded element: if the excluded one is strictly closer, this
		// start (and every earlier one) is beatable.
		if x-arr[mid] > arr[mid+k]-x {
			lo = mid + 1
		} else {
			// Left is at least as close; ties keep the smaller elements here.
			hi = mid
		}
	}
	result := make([]int, k)
	copy(result, arr[lo:lo+k])
	return result
}
