func minSumSquareDiff(nums1 []int, nums2 []int, k1 int, k2 int) int64 {
	// Only |nums1[i] - nums2[i]| matters: a +1 on either array moves the
	// difference one step in whichever direction we pick, so k1 and k2
	// pool into one budget spent on absolute differences.
	n := len(nums1)
	top := 0
	for i := 0; i < n; i++ {
		d := nums1[i] - nums2[i]
		if d < 0 {
			d = -d
		}
		if d > top {
			top = d
		}
	}
	counts := make([]int64, top+1)
	for i := 0; i < n; i++ {
		d := nums1[i] - nums2[i]
		if d < 0 {
			d = -d
		}
		counts[d]++
	}
	// Lowering an entry from v to v - 1 removes 2v - 1 from the sum,
	// more the larger v is, so a currently largest entry absorbs every
	// operation and none goes past zero (|d| would grow again). Sweep
	// levels downward, move whole buckets while the budget covers them,
	// split the bucket it does not cover. The budget widens before the
	// add: each of k1 and k2 fits an int32 but their sum does not.
	budget := int64(k1) + int64(k2)
	for level := top; level >= 1 && budget > 0; level-- {
		moved := budget
		if int64(counts[level]) < moved {
			moved = int64(counts[level])
		}
		if moved == 0 {
			continue
		}
		counts[level-1] += moved
		counts[level] -= moved
		budget -= moved
	}
	var total int64
	for level := 0; level <= top; level++ {
		total += int64(level) * int64(level) * counts[level]
	}
	return total
}
