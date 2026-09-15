// dp[mask] is the best score once exactly the elements of mask have been
// removed; the next operation is popcount(mask)/2 + 1 and pairs any two
// still-present elements. Ascending mask order works because transitions
// only set bits, and the growing multiplier is why the richest pair often
// belongs to the last operation, not the first. Totals stay below
// 28 * 10^6, inside 32-bit range.
func maxScore(nums []int) int {
	m := len(nums)
	g := make([][]int, m)
	for i := range g {
		g[i] = make([]int, m)
	}
	for i := 0; i < m; i++ {
		for j := i + 1; j < m; j++ {
			d := gcd1799(nums[i], nums[j])
			g[i][j] = d
			g[j][i] = d
		}
	}
	size := 1 << m
	cnt := make([]int, size)
	for mask := 1; mask < size; mask++ {
		cnt[mask] = cnt[mask>>1] + mask&1
	}
	dp := make([]int, size)
	for mask := 0; mask < size; mask++ {
		k := cnt[mask]/2 + 1
		base := dp[mask]
		for i := 0; i < m; i++ {
			if mask>>i&1 != 0 {
				continue
			}
			for j := i + 1; j < m; j++ {
				if mask>>j&1 != 0 {
					continue
				}
				cand := base + k*g[i][j]
				next := mask | 1<<i | 1<<j
				if cand > dp[next] {
					dp[next] = cand
				}
			}
		}
	}
	return dp[size-1]
}

func gcd1799(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
