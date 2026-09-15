func maxCompatibilitySum(students [][]int, mentors [][]int) int {
	m := len(students)
	// Precompute the m x m agreement counts so the DP touches only ints.
	score := make([][]int, m)
	for i := 0; i < m; i++ {
		score[i] = make([]int, m)
		for j := 0; j < m; j++ {
			s := 0
			for t := 0; t < len(students[i]); t++ {
				if students[i][t] == mentors[j][t] {
					s++
				}
			}
			score[i][j] = s
		}
	}
	full := 1 << m
	// dp[mask] = best total score matching the first popcount(mask) students
	// to exactly the mentors in mask; dp[0] = 0. The used-mentor count alone
	// pins down which student is placed next. Increasing numeric order works
	// because every submask is numerically smaller.
	dp := make([]int, full)
	popcount := make([]int, full)
	for mask := 1; mask < full; mask++ {
		popcount[mask] = popcount[mask&(mask-1)] + 1
		i := popcount[mask] - 1
		best := 0
		for j := 0; j < m; j++ {
			if mask>>j&1 == 1 {
				// Mentor j was this student's match: extend the assignment
				// without j by their pairwise score.
				v := dp[mask^(1<<j)] + score[i][j]
				if v > best {
					best = v
				}
			}
		}
		dp[mask] = best
	}
	return dp[full-1]
}
