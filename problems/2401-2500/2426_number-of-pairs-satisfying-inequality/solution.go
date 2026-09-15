func numberOfPairs(nums1 []int, nums2 []int, diff int) int64 {
	n := len(nums1)
	values := make([]int64, n)
	lo := int64(1) << 62
	hi := -(int64(1) << 62)
	for i := 0; i < n; i++ {
		values[i] = int64(nums1[i]) - int64(nums2[i])
		if values[i] < lo {
			lo = values[i]
		}
		if values[i] > hi {
			hi = values[i]
		}
	}
	size := int(hi - lo + 1)
	tree := make([]int64, size+1)
	count := int64(0)
	for i := 0; i < n; i++ {
		target := values[i] + int64(diff)
		if target >= lo {
			index := int(min64(target, hi)-lo) + 1
			for ; index > 0; index -= index & -index {
				count += tree[index]
			}
		}
		index := int(values[i]-lo) + 1
		for ; index <= size; index += index & -index {
			tree[index]++
		}
	}
	return count
}

func min64(a, b int64) int64 {
	if a < b {
		return a
	}
	return b
}
