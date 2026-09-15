func minSum(nums1 []int, nums2 []int) int64 {
	// Sums reach 10^5 * 10^6 = 10^11, past 32 bits: keep every sum in int64.
	var sum1, sum2 int64
	var zeros1, zeros2 int64
	for _, num := range nums1 {
		sum1 += int64(num)
		if num == 0 {
			zeros1++
		}
	}
	for _, num := range nums2 {
		sum2 += int64(num)
		if num == 0 {
			zeros2++
		}
	}
	// Cheapest fill: every zero becomes 1. An array with no zeros is stuck
	// at its exact sum and can never move.
	if zeros1 == 0 && zeros2 == 0 {
		if sum1 == sum2 {
			return sum1
		}
		return -1
	}
	if zeros1 == 0 {
		// nums2 can take any sum >= sum2 + zeros2, so it must be able to
		// climb exactly to the stuck sum1.
		if sum1 >= sum2+zeros2 {
			return sum1
		}
		return -1
	}
	if zeros2 == 0 {
		if sum2 >= sum1+zeros1 {
			return sum2
		}
		return -1
	}
	// Both arrays can climb freely from their all-1 fill: meet at the
	// higher floor.
	if sum1+zeros1 > sum2+zeros2 {
		return sum1 + zeros1
	}
	return sum2 + zeros2
}
