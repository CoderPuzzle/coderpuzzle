// One pass over the peaks: an index is a peak when it strictly beats both
// neighbors; expand each slope while it stays strict.
func longestMountain(arr []int) int {
	n := len(arr)
	best := 0
	i := 1
	for i < n-1 {
		if arr[i-1] < arr[i] && arr[i] > arr[i+1] {
			left := i - 1
			// Walk down the ascent while it keeps rising strictly.
			for left > 0 && arr[left-1] < arr[left] {
				left--
			}
			right := i + 1
			// Walk down the descent while it keeps falling strictly.
			for right < n-1 && arr[right] > arr[right+1] {
				right++
			}
			best = max(best, right-left+1)
			// The next peak lies strictly past this descent's floor.
			i = right + 1
		} else {
			i++
		}
	}
	return best
}
