func goodTriplets(nums1 []int, nums2 []int) int64 {
	n := len(nums1)
	pos2 := make([]int, n)
	for i, value := range nums2 {
		pos2[value] = i
	}
	a := make([]int, n) // a[i] = position of nums1[i] in nums2
	for i, value := range nums1 {
		a[i] = pos2[value]
	}

	smallerAfter := make([]int64, n) // per index: later nums1 values that precede it in nums2
	order := make([]int, n)          // merge-sort workspace of indexes, ordered by nums2 position
	for i := range order {
		order[i] = i
	}

	// mergeSort sorts order[lo:hi) by nums2 position while tallying, into
	// smallerAfter, the later indexes whose nums2 position precedes each value's.
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
			if a[left[i]] < a[order[j]] {
				smallerAfter[left[i]] += int64(j - mid) // right-half values already placed below it
				order[k] = left[i]
				i++
			} else {
				order[k] = order[j]
				j++
			}
			k++
		}
		for i < len(left) {
			smallerAfter[left[i]] += int64(j - mid) // the whole right half sits below it
			order[k] = left[i]
			i++
			k++
		}
	}
	mergeSort(0, n)

	var answer int64 = 0
	for i := range a {
		left := int64(a[i]) - smallerAfter[i] // values before value in nums1 and in nums2
		// values after value in both arrays
		right := int64(n-1-i) - smallerAfter[i]
		answer += left * right
	}
	return answer
}
