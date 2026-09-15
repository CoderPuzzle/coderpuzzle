func minSessions(tasks []int, sessionTime int) int {
	n := len(tasks)
	FULL := (1 << n) - 1
	const INF = int(^uint(0) >> 1)
	// dp[mask] = (sessions_used, remaining_time_in_open_session)
	sessions := make([]int, 1<<n)
	remaining := make([]int, 1<<n)
	for i := range sessions {
		sessions[i] = INF
	}
	sessions[0] = 0
	for mask := 0; mask < (1 << n); mask++ {
		if sessions[mask] == INF {
			continue
		}
		for i := 0; i < n; i++ {
			bit := 1 << i
			if mask&bit != 0 {
				continue
			}
			cost := tasks[i]
			var candS, candR int
			if remaining[mask] >= cost {
				candS = sessions[mask]
				candR = remaining[mask] - cost
			} else {
				candS = sessions[mask] + 1
				candR = sessionTime - cost
			}
			next := mask | bit
			// fewer sessions wins; tie -> more remaining time wins
			if candS < sessions[next] || (candS == sessions[next] && candR > remaining[next]) {
				sessions[next] = candS
				remaining[next] = candR
			}
		}
	}
	return sessions[FULL]
}
