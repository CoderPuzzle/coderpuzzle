func minOperations(nums1 []int, nums2 []int) int {
	// Two fates for the last column: untouched, or swapped once (which
	// exchanges the two targets). For fixed targets every earlier index
	// is independent: keep the pair if it already fits, else swap it if
	// it fits crossed, else the fate is dead.
	keep := cost(nums1, nums2, true)
	swap := cost(nums1, nums2, false)
	if keep == -1 && swap == -1 {
		return -1
	}
	if keep == -1 {
		return swap
	}
	if swap == -1 {
		return keep
	}
	return min(keep, swap)
}

func cost(nums1 []int, nums2 []int, keepLast bool) int {
	n := len(nums1)
	var top1, top2 int
	if keepLast {
		top1, top2 = nums1[n-1], nums2[n-1]
	} else {
		top1, top2 = nums2[n-1], nums1[n-1]
	}
	ops := 0
	if !keepLast {
		ops = 1
	}
	for i := 0; i < n-1; i++ {
		a, b := nums1[i], nums2[i]
		if a <= top1 && b <= top2 {
			continue
		}
		if b <= top1 && a <= top2 {
			ops++
		} else {
			return -1
		}
	}
	return ops
}
