func permute(n int, k int64) []int {
	// Counts only ever face comparison against k (<= 1e15), so the
	// factorials may saturate at a cap above 1e15: a saturated count still
	// reads as "more permutations than k needs".
	const cap = 2000000000000000
	half := (n + 1) / 2
	fact := make([]int64, half+1)
	for i := range fact {
		fact[i] = 1
	}
	for i := 2; i <= half; i++ {
		fact[i] = mulCap(fact[i-1], int64(i), cap)
	}
	result := make([]int, 0, n)
	// One flag per value: the greedy consumes each of 1..n at most once.
	used := make([]bool, n+1)
	oddsLeft := (n + 1) / 2
	evensLeft := n / 2
	lastParity := -1
	for depth := 0; depth < n; depth++ {
		// Ascending candidates: skip past the ones whose completion count
		// is too small to still hold k, reducing k by their size.
		placed := false
		for value := 1; value <= n; value++ {
			if used[value] || value%2 == lastParity {
				continue
			}
			odd := oddsLeft - (value % 2)
			even := evensLeft - (1 - value%2)
			// Once this value lands, the remaining parity pattern is
			// forced: the slots alternate starting with the opposite
			// parity, so the count is odd! * even! exactly when the
			// leftover values fit that pattern, and 0 otherwise.
			rest := n - depth - 1
			oddSlots := (rest + 1 - value%2) / 2
			var ways int64
			if oddSlots == odd && rest-oddSlots == even {
				ways = mulCap(fact[odd], fact[even], cap)
			}
			if ways >= k {
				used[value] = true
				result = append(result, value)
				if value%2 == 1 {
					oddsLeft--
				} else {
					evensLeft--
				}
				lastParity = value % 2
				placed = true
				break
			}
			k -= ways
		}
		if !placed {
			// Fewer than k alternating permutations exist; an empty, non-nil
			// slice so the JSON wire carries [] rather than null.
			return []int{}
		}
	}
	return result
}

// Saturating product: a result above the cap is indistinguishable from the
// cap itself, so the guard avoids overflowing int64 before multiplying.
func mulCap(a, b, cap int64) int64 {
	if a > cap/b {
		return cap
	}
	return a * b
}
