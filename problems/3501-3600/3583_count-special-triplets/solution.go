func specialTriplets(nums []int) int {
	// Sweep the middle index j while keeping counts of every value
	// strictly left and strictly right of it: j with v = nums[j]
	// contributes left[2v] * right[2v]. Counts fit in ints but the
	// product reaches 2.5 * 10^9 and the total up to C(10^5, 3) ≈
	// 1.7 * 10^14, so the accumulator is int64; the modulo lands once at
	// the end.
	right := make([]int, 200001)
	for _, x := range nums {
		right[x]++
	}
	left := make([]int, 200001)
	var ans int64
	for _, v := range nums {
		right[v]--
		ans += int64(left[2*v]) * int64(right[2*v])
		left[v]++
	}
	return int(ans % 1000000007)
}
