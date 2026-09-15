func checkEqualPartitions(nums []int, target int64) bool {
	// Enumerate every proper subset as one side; the mask's complement is
	// the other side. Products stop early once they exceed target, so
	// intermediates stay below target * 100 <= 1e17 — far inside the
	// int64 range.
	n := len(nums)
	full := (1 << n) - 1
	for _, x := range nums {
		if target%int64(x) != 0 {
			return false // every element sits in a side, so each divides target
		}
	}
	productWithin := func(mask int) int64 {
		product := int64(1)
		for i := 0; i < n; i++ {
			if mask>>i&1 == 1 {
				product *= int64(nums[i])
				if product > target {
					return -1
				}
			}
		}
		return product
	}
	for mask := 1; mask < full; mask++ {
		if productWithin(mask) == target && productWithin(mask^full) == target {
			return true
		}
	}
	return false
}
