func minimumReplacement(nums []int) int64 {
	// Splitting only shrinks numbers, so never touch the last element:
	// keep `bound` = max value allowed here given a sorted suffix.
	ops := int64(0)
	bound := int64(nums[len(nums)-1])
	for i := len(nums) - 2; i >= 0; i-- {
		x := int64(nums[i])
		if x <= bound {
			// Already fits the sorted suffix; it tightens the bound.
			bound = x
		} else {
			// Fewest pieces covering sum x with each <= bound; k even
			// pieces leave the largest at ceil(x/k) <= bound.
			k := (x + bound - 1) / bound
			ops += k - 1
			// Even split maximizes the smallest piece (floor(x/k)),
			// leaving the most room for elements further left.
			bound = x / k
		}
	}
	return ops
}
