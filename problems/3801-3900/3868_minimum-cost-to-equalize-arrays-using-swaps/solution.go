func minCost(nums1 []int, nums2 []int) int {
	// Within-array swaps are free, so only the frequency of each value in
	// each array matters. Both arrays must end with the same multiset:
	// value v appears (cnt1[v]+cnt2[v])/2 times in each, which is possible
	// only when that combined count is even. Every count is at most
	// n <= 8e4, so int arithmetic never overflows.
	cnt1 := make(map[int]int)
	cnt2 := make(map[int]int)
	values := make(map[int]bool)
	for _, v := range nums1 {
		cnt1[v]++
		values[v] = true
	}
	for _, v := range nums2 {
		cnt2[v]++
		values[v] = true
	}
	totalDiff := 0
	for v := range values {
		a, b := cnt1[v], cnt2[v]
		if (a+b)%2 == 1 {
			return -1
		}
		if a > b {
			totalDiff += a - b
		} else {
			totalDiff += b - a
		}
	}
	// Each cross swap moves one surplus element out of nums1 and one out of
	// nums2, fixing two placements at once. The surplus in nums1 is half the
	// positive differences, which is a quarter of the sum of all differences
	// because the two arrays are equally large.
	return totalDiff / 4
}
