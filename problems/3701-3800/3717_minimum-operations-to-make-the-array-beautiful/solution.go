func minOperations(nums []int) int {
	// Only increments exist and index 0 never moves, so a finished array is
	// a nondecreasing divisibility chain anchored at nums[0]. No optimal
	// chain runs above 2600: past max(nums) the chain could be held flat for
	// free (equal still divides), so only the last element may sit higher,
	// and its cheapest fix stays under predecessor + 50.
	const limit = 2600
	// Divisor lists of every final value, self inclusive -- holding the
	// previous height must remain a legal move.
	divisors := make([][]int, limit+1)
	for u := 1; u <= limit; u++ {
		for m := u; m <= limit; m += u {
			divisors[m] = append(divisors[m], u)
		}
	}
	const inf = 1<<31 - 1
	// dp[v]: cheapest way to make the processed prefix beautiful with the
	// last position holding exactly v.
	dp := make([]int, limit+1)
	for v := range dp {
		dp[v] = inf
	}
	dp[nums[0]] = 0
	for i := 1; i < len(nums); i++ {
		need := nums[i]
		ndp := make([]int, limit+1)
		for v := range ndp {
			ndp[v] = inf
		}
		for v := need; v <= limit; v++ {
			best := inf
			for _, u := range divisors[v] {
				if dp[u] < best {
					best = dp[u]
				}
			}
			if best != inf {
				ndp[v] = best + v - need
			}
		}
		copy(dp, ndp)
	}
	best := inf
	for _, v := range dp {
		if v < best {
			best = v
		}
	}
	return best
}
