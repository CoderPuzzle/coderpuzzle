func goodTriplets(nums1 []int, nums2 []int) int64 {
	n := len(nums1)
	pos2 := make([]int, n)
	for i, value := range nums2 {
		pos2[value] = i
	}

	tree := make([]int64, n+1) // Fenwick tree over positions in nums2
	add := func(i int, delta int64) {
		i++
		for i <= n {
			tree[i] += delta
			i += i & -i
		}
	}
	// prefixSum sums over indices 0..i inclusive; returns 0 when i < 0.
	prefixSum := func(i int) int64 {
		if i < 0 {
			return 0
		}
		i++
		var total int64
		for i > 0 {
			total += tree[i]
			i -= i & -i
		}
		return total
	}

	var answer int64 = 0
	for i, value := range nums1 {
		p := pos2[value]
		left := prefixSum(p - 1) // values before value in nums1 and in nums2
		// values after value in both arrays
		right := int64(n-1-p) - (int64(i) - left)
		answer += left * right
		add(p, 1)
	}
	return answer
}
