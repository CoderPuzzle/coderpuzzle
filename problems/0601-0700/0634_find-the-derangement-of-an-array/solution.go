const mod = 1_000_000_007

// Element 1 lands at some position i != 1 (n - 1 ways); either i's element
// takes 1's slot (D(n - 2) ways) or it does not (D(n - 1) ways), so
// D(n) = (n - 1) * (D(n - 1) + D(n - 2)). Both running values stay under
// the modulus, but their sum times (i - 1) reaches ~2e15, so the pair
// lives in int64s.
func findDerangement(n int) int {
	prev, cur := int64(1), int64(0) // D(0), D(1)
	for i := 2; i <= n; i++ {
		prev, cur = cur, int64(i-1)*(cur+prev)%mod
	}
	return int(cur)
}
