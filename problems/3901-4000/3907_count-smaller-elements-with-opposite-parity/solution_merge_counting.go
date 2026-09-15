func countSmallerOppositeParity(nums []int) []int {
	result := make([]int, len(nums)) // per index: smaller opposite-parity values to its right
	order := make([]int, len(nums))  // merge-sort workspace of indexes, ordered by value
	for i := range order {
		order[i] = i
	}

	// mergeSort sorts order[lo:hi) by value while tallying, into result, the
	// strictly smaller opposite-parity right-half values each left-half element
	// outranks.
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
		placed := [2]int{} // placed right-half values, split by parity
		i, j, k := 0, mid, lo
		for i < len(left) && j < hi {
			if nums[left[i]] <= nums[order[j]] { // equal: the left element places first, uncounted
				result[left[i]] += placed[(nums[left[i]]&1)^1]
				order[k] = left[i]
				i++
			} else {
				placed[nums[order[j]]&1]++
				order[k] = order[j]
				j++
			}
			k++
		}
		for i < len(left) {
			result[left[i]] += placed[(nums[left[i]]&1)^1] // placed opposite-parity values all sit below it
			order[k] = left[i]
			i++
			k++
		}
	}
	mergeSort(0, len(nums))
	return result
}
