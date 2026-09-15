func idealArrays(n int, maxValue int) int {
	const MOD = 1000000007
	// dp[v] = number of chains of the current length ending at value v
	dp := make([]int64, maxValue+1)
	for v := 1; v <= maxValue; v++ {
		dp[v] = 1
	}
	comb := int64(1) // C(n-1, 0)
	ans := int64(0)
	for chainLen := 1; chainLen <= n; chainLen++ {
		var total int64
		for _, x := range dp {
			total = (total + x) % MOD
		}
		ans = (ans + total*comb) % MOD
		if chainLen == n {
			break
		}
		// C(n-1, chainLen) = C(n-1, chainLen-1) * (n - chainLen) / chainLen
		comb = comb * int64(n-chainLen) % MOD * powmod(int64(chainLen), MOD-2) % MOD
		ndp := make([]int64, maxValue+1)
		for v := 1; v <= maxValue; v++ {
			cv := dp[v]
			if cv == 0 {
				continue
			}
			for m := v + v; m <= maxValue; m += v {
				ndp[m] = (ndp[m] + cv) % MOD
			}
		}
		dp = ndp
		var s int64
		for _, x := range dp {
			s += x
		}
		if s == 0 {
			break
		}
	}
	return int(ans % MOD)
}

func powmod(base int64, exp int64) int64 {
	const MOD = 1000000007
	r := int64(1)
	base %= MOD
	for exp > 0 {
		if exp&1 == 1 {
			r = r * base % MOD
		}
		base = base * base % MOD
		exp >>= 1
	}
	return r
}
