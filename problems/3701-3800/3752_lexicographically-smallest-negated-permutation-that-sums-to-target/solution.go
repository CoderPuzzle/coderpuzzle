func lexSmallestNegatedPerm(n int, target int64) []int {
	// The all-positive baseline [1, 2, ..., n] sums to S. Negating x
	// lowers the sum by 2 * x, so target is reachable exactly when it lies
	// in [-S, S] with the same parity as S. S reaches ~5 * 10^9, which
	// overflows int on 32-bit platforms — the deficit math runs in int64.
	total := int64(n) * int64(n+1) / 2
	if target < -total || target > total || (total-target)%2 != 0 {
		return []int{}
	}
	deficit := (total - target) / 2
	negated := make([]bool, n+1)
	// Greedily negate the largest values first; this is what puts the most
	// negative element at the front of the answer.
	for value := n; value >= 1; value-- {
		if int64(value) <= deficit {
			negated[value] = true
			deficit -= int64(value)
		}
	}
	result := make([]int, 0, n)
	for value := n; value >= 1; value-- {
		if negated[value] {
			result = append(result, -value)
		}
	}
	for value := 1; value <= n; value++ {
		if !negated[value] {
			result = append(result, value)
		}
	}
	return result
}
