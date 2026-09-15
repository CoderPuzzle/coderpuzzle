func confusingNumberII(n int) int {
	// DFS over the valid digits (0,1,6,8,9; no leading zero), pruning once
	// the value exceeds n. The rotated value is carried incrementally:
	// appending digit d to a k-digit value shifts the old rotation one
	// place left and prepends rot180(d).
	digits := []int{0, 1, 6, 8, 9}
	rot := []int{0, 1, -1, -1, -1, -1, 9, -1, 8, 6}
	pow10 := make([]int, 11)
	pow10[0] = 1
	for i := 1; i < 11; i++ {
		pow10[i] = pow10[i-1] * 10
	}
	count := 0
	var dfs func(cur, rotated, ndigits int)
	dfs = func(cur, rotated, ndigits int) {
		if cur > n {
			return
		}
		if cur > 0 && rotated != cur {
			count++
		}
		for _, d := range digits {
			if cur == 0 && d == 0 {
				continue
			}
			nxt := cur*10 + d
			if nxt <= n {
				dfs(nxt, rot[d]*pow10[ndigits]+rotated, ndigits+1)
			}
		}
	}
	dfs(0, 0, 0)
	return count
}
