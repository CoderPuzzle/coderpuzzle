func minimumSize(nums []int, maxOperations int) int {
	// A bag of v must end as ceil(v/penalty) pieces; each division creates
	// exactly one new bag, so it costs ceil(v/penalty) - 1 = (v - 1) /
	// penalty operations — achievable with near-equal splits, all of size
	// <= penalty.
	needed := func(penalty int) int {
		total := 0
		for _, balls := range nums {
			total += (balls - 1) / penalty
		}
		return total
	}

	// Achievability is monotone in the penalty, so binary search the
	// smallest feasible value; max(nums) needs zero operations.
	lo, hi := 1, 0
	for _, balls := range nums {
		if balls > hi {
			hi = balls
		}
	}
	for lo < hi {
		mid := (lo + hi) / 2
		if needed(mid) <= maxOperations {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
