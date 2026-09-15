func countTexts(pressedKeys string) int64 {
	const MOD int64 = 1000000007
	n := len(pressedKeys)
	dp := make([]int64, n+1)
	dp[0] = 1
	i := 0
	for i < n {
		ch := pressedKeys[i]
		maxPress := 3
		if ch == '7' || ch == '9' {
			maxPress = 4
		}
		j := i
		for j < n && pressedKeys[j] == ch {
			j++
		}
		for p := i; p < j; p++ {
			var total int64 = 0
			for q := p; q >= i && p-q < maxPress; q-- {
				total = (total + dp[q]) % MOD
			}
			dp[p+1] = total
		}
		i = j
	}
	return dp[n]
}
