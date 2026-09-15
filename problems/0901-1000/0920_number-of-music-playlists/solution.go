// dp[i][j] counts playlists of length i that use exactly j distinct songs.
// Play i introduces a new song — n - j + 1 choices left, so
// dp[i-1][j-1] * (n - j + 1) — or repeats a used one: the last k plays are
// pairwise distinct, because two occurrences of one song closer than k would
// already violate the window, so exactly min(k, j) used songs are blocked
// and max(0, j - k) remain, giving dp[i-1][j] * (j - k). Row i reads only
// row i-1, so one rolling row carries the table; the answer is dp[goal][n].
func numMusicPlaylists(n int, goal int, k int) int {
	const mod = 1_000_000_007
	prev := make([]int64, n+1)
	prev[0] = 1
	for i := 1; i <= goal; i++ {
		cur := make([]int64, n+1)
		for j := 1; j <= i && j <= n; j++ {
			total := prev[j-1] * int64(n-j+1)
			if j > k {
				total += prev[j] * int64(j-k)
			}
			cur[j] = total % mod
		}
		prev = cur
	}
	return int(prev[n])
}
