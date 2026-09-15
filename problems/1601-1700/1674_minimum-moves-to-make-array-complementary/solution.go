func minMoves(nums []int, limit int) int {
	n := len(nums)
	// Difference array over candidate target sums t in [2, 2*limit]: each
	// mirror pair's cost curve becomes range updates.
	diff := make([]int, 2*limit+2)
	for i := 0; i < n/2; i++ {
		a, b := nums[i], nums[n-1-i]
		lo, hi := a, b
		if lo > hi {
			lo, hi = hi, lo
		}
		// Base cost 2 everywhere; −1 across [lo+1, hi+limit], the sums one
		// changed element can reach; a further −1 exactly at t = a + b,
		// where no change is needed.
		diff[2] += 2
		diff[lo+1] -= 1
		diff[a+b] -= 1
		diff[a+b+1] += 1
		diff[hi+limit+1] += 1
	}
	// Prefix sums give the total cost per target; keep the minimum.
	best := 1 << 60
	cur := 0
	for target := 2; target <= 2*limit; target++ {
		cur += diff[target]
		if cur < best {
			best = cur
		}
	}
	return best
}
