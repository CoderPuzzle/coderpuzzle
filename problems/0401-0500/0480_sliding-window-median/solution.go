import "sort"

func medianSlidingWindow(nums []int, k int) []float64 {
	// One sorted slice mirrors the window: binary insertion keeps it
	// sorted without ever re-sorting a whole window.
	window := make([]int, 0, len(nums))
	out := make([]float64, 0, len(nums)-k+1)
	for i, x := range nums {
		pos := sort.SearchInts(window, x)
		window = append(window, 0)
		copy(window[pos+1:], window[pos:])
		window[pos] = x
		// Evict the leftmost occurrence of the outgoing value — equal
		// elements are interchangeable, so the multiset stays exact.
		if i >= k {
			p := sort.SearchInts(window, nums[i-k])
			window = append(window[:p], window[p+1:]...)
		}
		// Eviction already ran, so exactly k values are present here; the
		// median is then a plain index lookup (middle pair for even k).
		if i >= k-1 {
			if k%2 == 1 {
				out = append(out, float64(window[k/2]))
			} else {
				out = append(out, (float64(window[k/2-1])+float64(window[k/2]))/2.0)
			}
		}
	}
	return out
}
