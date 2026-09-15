func numberOfPairs(nums1 []int, nums2 []int, diff int) int64 {
	values := make([]int64, len(nums1))
	for i := range values {
		values[i] = int64(nums1[i]) - int64(nums2[i])
	}
	count := int64(0)

	// mergeSort sorts values[lo:hi) while tallying, into count, the cross pairs
	// values[i] <= values[j] + diff with i in the left half and j in the right.
	var mergeSort func(lo, hi int)
	mergeSort = func(lo, hi int) {
		if hi-lo < 2 {
			return
		}
		mid := (lo + hi) / 2
		mergeSort(lo, mid)
		mergeSort(mid, hi)
		left := make([]int64, mid-lo)
		copy(left, values[lo:mid])
		p := 0 // left values at or below the running bound
		for j := mid; j < hi; j++ {
			for p < len(left) && left[p] <= values[j]+int64(diff) {
				p++
			}
			count += int64(p) // each admitted left value pairs with this right element
		}
		i, j, k := 0, mid, lo
		for i < len(left) && j < hi {
			if left[i] <= values[j] { // equal: the left element places first
				values[k] = left[i]
				i++
			} else {
				values[k] = values[j]
				j++
			}
			k++
		}
		for i < len(left) {
			values[k] = left[i]
			i++
			k++
		}
	}
	mergeSort(0, len(values))
	return count
}
