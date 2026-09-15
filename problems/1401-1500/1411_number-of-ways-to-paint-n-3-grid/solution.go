func numOfWays(n int) int {
	const MOD = 1_000_000_007
	a, b := 6, 6
	for i := 1; i < n; i++ {
		a, b = (3*a+2*b)%MOD, (2*a+2*b)%MOD
	}
	return (a + b) % MOD
}
