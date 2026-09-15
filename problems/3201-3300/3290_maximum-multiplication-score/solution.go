// dp[t][j] = best score using the first j elements of b with exactly t picks
// made; dp[t][j] = max(dp[t][j-1], dp[t-1][j-1] + a[t-1]*b[j]). Each row
// reads only the previous row, so four rolling variables carry everything;
// update counts from high to low so each element is consumed at most once.
// Scores reach +-4e10, past the 32-bit range.
func maxScore(a []int, b []int) int64 {
	const ninf int64 = -(1 << 62)
	d1, d2, d3, d4 := ninf, ninf, ninf, ninf
	for _, x := range b {
		if d3 != ninf {
			d4 = max(d4, d3+int64(a[3])*int64(x))
		}
		if d2 != ninf {
			d3 = max(d3, d2+int64(a[2])*int64(x))
		}
		if d1 != ninf {
			d2 = max(d2, d1+int64(a[1])*int64(x))
		}
		d1 = max(d1, int64(a[0])*int64(x))
	}
	return d4
}
