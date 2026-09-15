func getSum(nums []int) int {
	// Per-value chain-sum DP over four hash maps keyed by value. For each
	// direction, incCnt/decCnt count the chains seen so far that end at an
	// element of a value and incSum/decSum carry their total element-sum;
	// buckets accumulate across duplicate occurrences, so element x extends
	// every earlier chain ending at x-1 (or x+1) — subsequence semantics,
	// not substring. New chains ending here have count cnt + 1 (the
	// singleton [x]) and sum sum + cnt * x + x; the singleton lives in both
	// directions but is counted once, so the step contributes
	// incSum' + decSum' - x. Reduced mod 10^9 + 7 every update: stored
	// values < 10^9 + 7, widest intermediate is cnt * x + sum <
	// ~1.1 * 10^14, within int64.
	const mod = 1000000007
	incCnt := make(map[int]int64)
	incSum := make(map[int]int64)
	decCnt := make(map[int]int64)
	decSum := make(map[int]int64)
	var total int64 = 0
	for _, x := range nums {
		ci := incCnt[x-1]
		si := incSum[x-1]
		cd := decCnt[x+1]
		sd := decSum[x+1]
		ni := (ci + 1) % mod
		nsi := (si + ni*int64(x)) % mod
		nd := (cd + 1) % mod
		nsd := (sd + nd*int64(x)) % mod
		total = ((total+nsi+nsd-int64(x))%mod + mod) % mod
		incCnt[x] = (incCnt[x] + ni) % mod
		incSum[x] = (incSum[x] + nsi) % mod
		decCnt[x] = (decCnt[x] + nd) % mod
		decSum[x] = (decSum[x] + nsd) % mod
	}
	return int(total)
}
