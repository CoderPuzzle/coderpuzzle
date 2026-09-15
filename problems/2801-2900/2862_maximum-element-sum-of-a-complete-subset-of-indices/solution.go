import "math"

func maximumSum(nums []int) int64 {
	squarefreePart := func(x int) int {
		// Product of primes with odd exponent in x, e.g. P(18) = 2. Trial
		// division suffices: only indices are factored. Anything surviving
		// the loop is one leftover prime with exponent one.
		result := 1
		d := 2
		for d*d <= x {
			if x%d == 0 {
				count := 0
				for x%d == 0 {
					x /= d
					count++
				}
				if count%2 == 1 {
					result *= d
				}
			}
			d++
		}
		if x > 1 {
			result *= x
		}
		return result
	}

	// Writing each index as (squarefree part) x (perfect square), the
	// product of two indices is a perfect square exactly when their
	// squarefree parts match — so complete subsets are precisely the indices
	// sharing one squarefree part. Sum per group, take the max; singletons
	// qualify since the pair condition is vacuous.
	groups := make(map[int]int64)
	for i := 1; i <= len(nums); i++ {
		groups[squarefreePart(i)] += int64(nums[i-1])
	}
	best := int64(math.MinInt64)
	for _, v := range groups {
		if v > best {
			best = v
		}
	}
	return best
}
