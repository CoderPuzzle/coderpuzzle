func countOrders(n int) int {
	const MOD = 1000000007
	result := 1
	// f(i) = f(i-1) * i * (2i-1): the 2(i-1) placed services leave
	// 2i-1 gaps; pickup picks one, delivery lands to its right (1+2+...+(2i-1))
	for i := 2; i <= n; i++ {
		result = result * (2*i - 1) % MOD * i % MOD
	}
	return result
}
