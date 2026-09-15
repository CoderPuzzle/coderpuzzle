// Reachable sums are [n, 6n] per array, so equality is impossible exactly
// when those ranges are disjoint. Otherwise tally each operation's best
// gain (v-1 for elements of the larger-sum array, 6-v for the smaller)
// and spend the largest gains first.
func minOperations(nums1 []int, nums2 []int) int {
	if len(nums1) > 6*len(nums2) || len(nums2) > 6*len(nums1) {
		return -1
	}
	sum1, sum2 := 0, 0
	for _, v := range nums1 {
		sum1 += v
	}
	for _, v := range nums2 {
		sum2 += v
	}
	if sum1 == sum2 {
		return 0
	}
	big, small := nums1, nums2
	if sum2 > sum1 {
		big, small = nums2, nums1
	}
	gap := sum1 - sum2
	if gap < 0 {
		gap = -gap
	}
	gains := [6]int{}
	for _, v := range big {
		gains[v-1]++
	}
	for _, v := range small {
		gains[6-v]++
	}
	ops := 0
	for g := 5; g >= 1; g-- {
		take := (gap + g - 1) / g
		if gains[g] < take {
			take = gains[g]
		}
		ops += take
		gap -= take * g
		if gap <= 0 {
			break
		}
	}
	return ops
}
