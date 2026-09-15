func maxLength(ribbons []int, k int) int64 {
	// Monotone predicate: sum(r / x) >= k. Binary search the largest
	// feasible x; 0 when even x=1 fails.
	var lo int64 = 1
	var hi int64
	for _, r := range ribbons {
		if int64(r) > hi {
			hi = int64(r)
		}
	}
	var ans int64
	for lo <= hi {
		mid := (lo + hi) / 2
		var pieces int64
		for _, r := range ribbons {
			pieces += int64(r) / mid
		}
		if pieces >= int64(k) {
			ans = mid
			lo = mid + 1
		} else {
			hi = mid - 1
		}
	}
	return ans
}
