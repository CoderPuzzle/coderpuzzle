func shortestCommonSupersequence(str1 string, str2 string) string {
	n := len(str1)
	m := len(str2)
	// dp[i][j] = length of the LCS of str1[i:] and str2[j:].
	dp := make([][]int, n+1)
	for i := range dp {
		dp[i] = make([]int, m+1)
	}
	for i := n - 1; i >= 0; i-- {
		for j := m - 1; j >= 0; j-- {
			if str1[i] == str2[j] {
				dp[i][j] = dp[i+1][j+1] + 1
			} else {
				dp[i][j] = max(dp[i+1][j], dp[i][j+1])
			}
		}
	}

	var parts []byte
	i, j := 0, 0
	for i < n && j < m {
		if str1[i] == str2[j] {
			parts = append(parts, str1[i])
			i += 1
			j += 1
		} else if dp[i+1][j] >= dp[i][j+1] {
			parts = append(parts, str1[i])
			i += 1
		} else {
			parts = append(parts, str2[j])
			j += 1
		}
	}
	parts = append(parts, str1[i:]...)
	parts = append(parts, str2[j:]...)
	return string(parts)
}
