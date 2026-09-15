const inf3538 = int64(1) << 60

func minTravelTime(l int, n int, k int, position []int, time []int) int {
	// prefix[t] = sum of time[0..t-1]; merging a run of s removals that
	// sit directly before kept sign i folds time[i-s..i] into its rate.
	// Answers stay <= l * sum(time) <= 1e7, but widen to int64.
	prefix := make([]int64, n+1)
	for i := 0; i < n; i++ {
		prefix[i+1] = prefix[i] + int64(time[i])
	}
	// dp[i][j][s]: sign i kept, j merges spent, s consecutive removals
	// directly before i; the outgoing segment (i -> next kept) is charged
	// when the transition is relaxed.
	dp := make([][][]int64, n)
	for i := range dp {
		dp[i] = make([][]int64, k+1)
		for j := range dp[i] {
			dp[i][j] = make([]int64, k+1)
			for s := range dp[i][j] {
				dp[i][j][s] = inf3538
			}
		}
	}
	dp[0][0][0] = 0
	for i := 0; i < n; i++ {
		for j := 0; j <= k; j++ {
			for s := 0; s <= k; s++ {
				base := dp[i][j][s]
				if base == inf3538 {
					continue
				}
				rate := prefix[i+1] - prefix[i-s]
				for q := i + 1; q < n; q++ {
					d := q - i - 1
					if j+d > k {
						break
					}
					cost := base + int64(position[q]-position[i])*rate
					if cost < dp[q][j+d][d] {
						dp[q][j+d][d] = cost
					}
				}
			}
		}
	}
	best := inf3538
	for s := 0; s <= k; s++ {
		if dp[n-1][k][s] < best {
			best = dp[n-1][k][s]
		}
	}
	return int(best)
}
