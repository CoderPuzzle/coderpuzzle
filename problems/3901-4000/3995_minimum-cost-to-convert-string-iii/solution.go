func minCost(s string, t string, rules [][]string, costs []int) int {
	n := len(s)
	const inf = int(1e9)
	dp := make([]int, n+1)
	for i := range dp {
		dp[i] = inf
	}
	dp[0] = 0
	for i := 0; i < n; i++ {
		if dp[i] == inf {
			continue
		}
		if s[i] == t[i] && dp[i] < dp[i+1] {
			dp[i+1] = dp[i]
		}
		for q, r := range rules {
			p, rep := r[0], r[1]
			z := len(p)
			if i+z > n || t[i:i+z] != rep {
				continue
			}
			ok, stars := true, 0
			for j := 0; j < z; j++ {
				if p[j] == '*' {
					stars++
				} else if p[j] != s[i+j] {
					ok = false
				}
			}
			v := dp[i] + costs[q] + stars
			if ok && v < dp[i+z] {
				dp[i+z] = v
			}
		}
	}
	if dp[n] == inf {
		return -1
	}
	return dp[n]
}
