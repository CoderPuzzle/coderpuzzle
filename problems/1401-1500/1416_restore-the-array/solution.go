import "strconv"

func numberOfArrays(s string, k int64) int64 {
	const MOD = 1_000_000_007
	n := len(s)
	maxLen := len(strconv.FormatInt(k, 10))
	dp := make([]int64, n+1)
	dp[n] = 1
	for i := n - 1; i >= 0; i-- {
		if s[i] == '0' {
			continue
		}
		var total, value int64
		limit := maxLen
		if n-i < limit {
			limit = n - i
		}
		for length := 1; length <= limit; length++ {
			value = value*10 + int64(s[i+length-1]-'0')
			if value > k {
				break
			}
			total = (total + dp[i+length]) % MOD
		}
		dp[i] = total
	}
	return dp[0]
}
