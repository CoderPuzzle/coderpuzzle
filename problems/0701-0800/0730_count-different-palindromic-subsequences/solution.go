// dp[x][i][j] counts the distinct palindromic subsequences of s[i..j] that
// begin and end with chr(97 + x). An end that does not match x shrinks off:
// dp[x][i+1][j] when s[i] != x, else dp[x][i][j-1]. When both ends are x,
// gluing x onto both sides of every palindromic interior gives
// 2 + sum_y dp[y][i+1][j-1] — the +2 is "x" and "xx" — while adjacent ends
// carry only those two. Every read stays in rows i and i+1, so two rolling
// rows carry the table; the answer is sum_x dp[x][0][n-1].
func countPalindromicSubsequences(s string) int {
	const mod = 1_000_000_007
	n := len(s)
	prev := make([][4]int64, n)
	cur := make([][4]int64, n)
	for i := n - 1; i >= 0; i-- {
		c := int(s[i] - 'a')
		cur[i] = [4]int64{}
		cur[i][c] = 1
		for j := i + 1; j < n; j++ {
			cur[j] = prev[j]
			if int(s[j]-'a') == c {
				if j == i+1 {
					cur[j][c] = 2
				} else {
					inner := prev[j-1][0] + prev[j-1][1] + prev[j-1][2] + prev[j-1][3]
					cur[j][c] = (2 + inner) % mod
				}
			} else {
				cur[j][c] = cur[j-1][c]
			}
		}
		prev, cur = cur, prev
	}
	total := prev[n-1][0] + prev[n-1][1] + prev[n-1][2] + prev[n-1][3]
	return int(total % mod)
}
