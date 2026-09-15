func countBits(n int) []int {
	ans := make([]int, n+1)
	for i := 1; i <= n; i++ {
		// value & (value - 1) clears the lowest set bit in one AND, so the
		// loop body runs exactly popcount(i) times — never once per bit
		// position.
		count := 0
		for value := i; value != 0; value &= value - 1 {
			count++
		}
		ans[i] = count
	}
	return ans
}
