func sumOfGoodSubsequences(nums []int) int {
	const MOD = 1000000007
	// offset by 1 so that value 0 can look up value -1 at index 0
	// cnt[i] / sm[i]: number of, and total element sum of, the good
	// subsequences seen so far that end in value i-1. The differ-by-one
	// constraint only involves the last value, so this is enough state.
	cnt := make([]int64, 100003)
	sm := make([]int64, 100003)
	total := int64(0)
	for _, x := range nums {
		idx := x + 1
		// New subsequences ending at x: the singleton plus every recorded
		// subsequence ending in x-1 or x+1 extended by x.
		cPrev := cnt[idx-1]
		cNext := cnt[idx+1]
		sPrev := sm[idx-1]
		sNext := sm[idx+1]
		newCnt := (1 + cPrev + cNext) % MOD
		// Each of the newCnt subsequences gains one copy of x; the
		// elements already inside carry their sums forward.
		newSum := (int64(x)*newCnt + sPrev + sNext) % MOD
		cnt[idx] = (cnt[idx] + newCnt) % MOD
		sm[idx] = (sm[idx] + newSum) % MOD
		// A subsequence's sum is folded in when its last element is
		// appended, so every good subsequence is counted exactly once.
		total = (total + newSum) % MOD
	}
	return int(total)
}
