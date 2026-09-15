// dp[i][j] counts ways to fill the first i+1 positions, valid so far,
// with position i holding the j-th smallest value placed. Appending a
// value of new rank j shifts older ranks >= j up one, so an 'I' step
// admits exactly the old ranks below j and a 'D' step the old ranks j
// and above — both are prefix sums of the previous row: P[j] for 'I',
// P[m] - P[j] for 'D'. One rolling row carries the table; the answer is
// sum dp[n][*].
func numPermsDISequence(s string) int {
	const mod = 1_000_000_007
	dp := []int64{1}
	for i := 0; i < len(s); i++ {
		m := len(dp)
		prefix := make([]int64, m+1)
		for j := 0; j < m; j++ {
			prefix[j+1] = (prefix[j] + dp[j]) % mod
		}
		if s[i] == 'I' {
			dp = prefix
		} else {
			next := make([]int64, m+1)
			for j := 0; j <= m; j++ {
				next[j] = (prefix[m] - prefix[j] + mod) % mod
			}
			dp = next
		}
	}
	total := int64(0)
	for _, v := range dp {
		total += v
	}
	return int(total % mod)
}
