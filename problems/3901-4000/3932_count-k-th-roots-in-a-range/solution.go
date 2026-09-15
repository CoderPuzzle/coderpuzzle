func countKthRoots(l int, r int, k int) int {
	if k == 1 {
		return r - l + 1
	}
	count := func(bound int64) int {
		if bound < 0 {
			return 0
		}
		fits := func(base int64) bool {
			value := int64(1)
			for i := 0; i < k; i++ {
				if base != 0 && value > bound/base {
					return false
				}
				value *= base
			}
			return value <= bound
		}
		low, high := int64(0), bound
		for low < high {
			middle := low + (high-low+1)/2
			if fits(middle) {
				low = middle
			} else {
				high = middle - 1
			}
		}
		return int(low) + 1
	}
	return count(int64(r)) - count(int64(l)-1)
}
