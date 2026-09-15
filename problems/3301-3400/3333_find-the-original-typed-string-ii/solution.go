func possibleStringCount(word string, k int) int {
	const MOD = 1000000007
	// Each maximal run of length c contributes between 1 and c intended
	// characters; count tuples of total length >= k as total - (length < k).
	n := len(word)
	runs := make([]int, 0, n)
	for i := 0; i < n; {
		j := i
		for j < n && word[j] == word[i] {
			j++
		}
		runs = append(runs, j-i)
		i = j
	}

	r := len(runs)
	var total int64 = 1
	for _, c := range runs {
		total = total * int64(c) % MOD
	}
	if k <= r {
		return int(total) // every tuple already has length >= r >= k
	}

	// dp[j] = number of ways to reach total length j (< k).
	dp := make([]int64, k)
	ndp := make([]int64, k)
	prefix := make([]int64, k+1)
	dp[0] = 1
	for _, c := range runs {
		var s int64
		for j := 0; j < k; j++ {
			s = (s + dp[j]) % MOD
			prefix[j+1] = s
		}
		for j := 1; j < k; j++ {
			lo := 0
			if j-c > lo {
				lo = j - c
			}
			ndp[j] = (prefix[j] - prefix[lo] + MOD) % MOD
		}
		ndp[0] = 0
		dp, ndp = ndp, dp
	}

	var bad int64
	for j := 0; j < k; j++ {
		bad = (bad + dp[j]) % MOD
	}
	return int(((total-bad)%MOD + MOD) % MOD)
}
