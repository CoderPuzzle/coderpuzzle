func numTilings(n int) int {
	const MOD = 1000000007
	if n == 1 {
		return 1
	}
	if n == 2 {
		return 2
	}
	a, b, c := 1, 1, 2 // f(0), f(1), f(2)
	for i := 3; i <= n; i++ {
		a, b, c = b, c, (2*c+a)%MOD
	}
	return c
}
