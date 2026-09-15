func countStableSubarrays(capacity []int) int64 {
	n := len(capacity)
	// Prefix sums reach n * 10^9 = 10^14, well past 32 bits, so they
	// accumulate in 64-bit integers even though each element fits.
	prefix := make([]int64, n)
	prefix[0] = int64(capacity[0])
	for i := 1; i < n; i++ {
		prefix[i] = prefix[i-1] + int64(capacity[i])
	}
	// With p the inclusive prefix sums, [l, r] is stable exactly when
	// (capacity[l], p[l]) equals (capacity[r], p[r - 1] - capacity[r]):
	// equal boundary values, and an interior sum that reduces to plain
	// prefix equality. The two components form a comparable array key.
	seen := make(map[[2]int64]int64)
	var count int64
	for r := 2; r < n; r++ {
		left := r - 2
		seen[[2]int64{int64(capacity[left]), prefix[left]}]++
		count += seen[[2]int64{int64(capacity[r]), prefix[r-1] - int64(capacity[r])}]
	}
	return count
}
