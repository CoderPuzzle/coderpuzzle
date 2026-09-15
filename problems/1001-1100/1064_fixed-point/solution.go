func fixedPoint(arr []int) int {
	lo, hi := 0, len(arr)-1
	for lo < hi {
		mid := lo + (hi-lo)/2
		if arr[mid]-mid >= 0 {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	if arr[lo] == lo {
		return lo
	}
	return -1
}
