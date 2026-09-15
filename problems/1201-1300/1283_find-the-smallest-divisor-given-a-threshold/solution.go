func smallestDivisor(nums []int, threshold int) int {
	// (x + d - 1) / d is the float-free ceiling of x / d.
	total := func(divisor int) int {
		s := 0
		for _, x := range nums {
			s += (x + divisor - 1) / divisor
		}
		return s
	}
	hi := nums[0]
	for _, x := range nums {
		if x > hi {
			hi = x
		}
	}
	// The ceiled sum is non-increasing in the divisor, so "sum <= threshold"
	// is monotone: lower-bound search for the smallest valid d. Past
	// max(nums) every term is already 1, capping the range.
	lo := 1
	for lo < hi {
		mid := lo + (hi-lo)/2
		if total(mid) <= threshold {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
