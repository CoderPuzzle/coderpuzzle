func countHousePlacements(n int) int {
	const mod = 1000000007
	prev, curr := int64(1), int64(2)
	for i := 1; i < n; i++ {
		prev, curr = curr, (prev+curr)%mod
	}
	return int(curr * curr % mod)
}
