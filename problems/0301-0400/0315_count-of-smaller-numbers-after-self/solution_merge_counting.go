func countSmaller(nums []int) []int {
	result := make([]int, len(nums)) // per index: strictly smaller values to its right
	order := make([]int, len(nums))  // merge-sort workspace of indexes, ordered by value
	for i := range order {
		order[i] = i
	}

	// mergeSort sorts order[lo:hi) by value while tallying, into result, the
	// strictly smaller right-half values each left-half element outranks.
	var mergeSort func(lo, hi int)
	mergeSort = func(lo, hi int) {
		if hi-lo < 2 {
			return
		}
		mid := (lo + hi) / 2
		mergeSort(lo, mid)
		mergeSort(mid, hi)
		left := make([]int, mid-lo)
		copy(left, order[lo:mid])
		i, j, k := 0, mid, lo
		for i < len(left) && j < hi {
			if nums[left[i]] <= nums[order[j]] { // equal: the left element places first, uncounted
				result[left[i]] += j - mid // right-half values already placed below it
				order[k] = left[i]
				i++
			} else {
				order[k] = order[j]
				j++
			}
			k++
		}
		for i < len(left) {
			result[left[i]] += j - mid // the whole right half sits below it
			order[k] = left[i]
			i++
			k++
		}
	}
	mergeSort(0, len(nums))
	return result
}
