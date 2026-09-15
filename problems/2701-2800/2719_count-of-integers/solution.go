func count(num1 string, num2 string, min_sum int, max_sum int) int {
	const MOD = 1000000007

	a := countRange(num2, min_sum, max_sum)
	b := countRange(decrement(num1), min_sum, max_sum)
	return int(((a-b)%MOD + MOD) % MOD)
}

func countRange(s string, minSum int, maxSum int) int64 {
	const MOD = 1000000007
	m := len(s)
	ms := maxSum
	dp := make([][]int64, 2)
	for t := range dp {
		dp[t] = make([]int64, ms+1)
	}
	for sm := 0; sm <= ms; sm++ {
		v := int64(0)
		if sm >= minSum {
			v = 1
		}
		dp[0][sm] = v
		dp[1][sm] = v
	}
	for pos := m - 1; pos >= 0; pos-- {
		d0 := int(s[pos] - '0')
		ndp := make([][]int64, 2)
		for t := range ndp {
			ndp[t] = make([]int64, ms+1)
		}
		for tight := 0; tight < 2; tight++ {
			limit := 9
			if tight == 1 {
				limit = d0
			}
			for sm := 0; sm <= ms; sm++ {
				var total int64
				for d := 0; d <= limit; d++ {
					ns := sm + d
					if ns > ms {
						break
					}
					nt := 0
					if tight == 1 && d == limit {
						nt = 1
					}
					total += dp[nt][ns]
				}
				ndp[tight][sm] = total % MOD
			}
		}
		dp = ndp
	}
	return dp[1][0]
}

func decrement(s string) string {
	arr := []byte(s)
	i := len(arr) - 1
	for i >= 0 && arr[i] == '0' {
		arr[i] = '9'
		i--
	}
	arr[i]--
	j := 0
	for j < len(arr)-1 && arr[j] == '0' {
		j++
	}
	return string(arr[j:])
}
