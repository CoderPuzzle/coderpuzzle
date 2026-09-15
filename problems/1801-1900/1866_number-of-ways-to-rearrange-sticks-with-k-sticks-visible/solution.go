func rearrangeSticks(n int, k int) int {
	const mod = 1000000007
	// cur[j] = f(i, j): i sticks, j visible
	cur := make([]int64, k+1)
	cur[0] = 1 // f(0, 0)
	for i := 1; i <= n; i++ {
		nxt := make([]int64, k+1)
		for j := 1; j <= k; j++ {
			nxt[j] = (cur[j-1] + int64(i-1)*cur[j]) % mod
		}
		cur = nxt
	}
	return int(cur[k])
}
