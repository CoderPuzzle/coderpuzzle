func distinctSequences(n int) int {
	const MOD = 1000000007
	gcd := func(a, b int) int {
		for b != 0 {
			a, b = b, a%b
		}
		return a
	}
	if n == 1 {
		return 6
	}
	// dp[a][b] counts valid sequences ending in ..., a, b; the gap rule
	// looks back exactly two positions, so nothing older matters
	dp := make([][]int64, 7)
	for i := range dp {
		dp[i] = make([]int64, 7)
	}
	// base: length-2 sequences, one per ordered coprime pair with a != b
	for a := 1; a <= 6; a++ {
		for b := 1; b <= 6; b++ {
			if a != b && gcd(a, b) == 1 {
				dp[a][b] = 1
			}
		}
	}
	for length := 3; length <= n; length++ {
		ndp := make([][]int64, 7)
		for i := range ndp {
			ndp[i] = make([]int64, 7)
		}
		for a := 1; a <= 6; a++ {
			for b := 1; b <= 6; b++ {
				cnt := dp[a][b]
				// coprime pairs are sparse: skipping dead states prunes
				// most of the 36-entry table
				if cnt == 0 {
					continue
				}
				for c := 1; c <= 6; c++ {
					// c != b: no adjacent equal (coprimality alone misses
					// (1,1)); c != a: no repeat at distance 2 (gcd would
					// not object when a = 1)
					if c != a && c != b && gcd(c, b) == 1 {
						// ..., a, b, c ends in (b, c)
						ndp[b][c] = (ndp[b][c] + cnt) % MOD
					}
				}
			}
		}
		dp = ndp
	}
	// every entry is the ending of one full length-n sequence
	var total int64
	for a := 1; a <= 6; a++ {
		for b := 1; b <= 6; b++ {
			total = (total + dp[a][b]) % MOD
		}
	}
	return int(total)
}
