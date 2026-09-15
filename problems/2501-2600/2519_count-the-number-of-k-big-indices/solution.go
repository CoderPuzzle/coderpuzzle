func kBigIndices(nums []int, k int) int {
	// smallerCounts walks one Fenwick tree over the value range and
	// records, for every index, how many strictly smaller values sit
	// before it.
	smallerCounts := func(values []int) []int {
		bound := 0
		for _, v := range values {
			if v > bound {
				bound = v
			}
		}
		tree := make([]int, bound+1)
		counts := make([]int, len(values))
		for i, value := range values {
			for j := value - 1; j > 0; j -= j & -j {
				counts[i] += tree[j]
			}
			for j := value; j <= bound; j += j & -j {
				tree[j]++
			}
		}
		return counts
	}
	// Two Fenwick sweeps over the value range answer, for every index,
	// how many strictly smaller values sit on each side: a forward pass
	// fills the left counts and a backward pass reruns the helper on a
	// fresh tree for the right ones. An index is k-big exactly when both
	// counts reach k.
	left := smallerCounts(nums)
	reversed := make([]int, len(nums))
	for i := range nums {
		reversed[i] = nums[len(nums)-1-i]
	}
	right := smallerCounts(reversed)
	big := 0
	for i := range nums {
		if left[i] >= k && right[len(nums)-1-i] >= k {
			big++
		}
	}
	return big
}
