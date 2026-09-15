func waysToSplit(nums []int) int {
	const MOD = 1000000007
	n := len(nums)
	prefix := make([]int64, n+1)
	for i, value := range nums {
		prefix[i+1] = prefix[i] + int64(value)
	}
	total := prefix[n]
	var answer int64
	// Both cut bounds move monotonically with the first cut, so two pointers
	// that only ever advance replace the repeated binary searches.
	lo, hi := 2, 2
	for i := 1; i < n-1; i++ {
		left := prefix[i]
		if lo < i+1 {
			lo = i + 1
		}
		// left <= mid becomes prefix[j] >= 2 * left: skip the entries that
		// leave the middle block too small.
		for lo < n && prefix[lo] < 2*left {
			lo++
		}
		if lo >= n {
			continue
		}
		// mid <= right becomes prefix[j] <= (total + left) / 2 — the floor
		// is exact because the bound is an integer inequality.
		if hi < lo {
			hi = lo
		}
		for hi < n && prefix[hi] <= (total+left)/2 {
			hi++
		}
		if hi > lo {
			answer = (answer + int64(hi-lo)) % MOD
		}
	}
	return int(answer)
}
