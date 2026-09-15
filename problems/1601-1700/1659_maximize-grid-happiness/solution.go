// Fill the grid cell by cell, row-major, and charge every bond when its
// second member is placed: a newcomer of type v pays its own base (120
// for an introvert, 40 for an extrovert) plus, for each of the two
// neighbours possibly already placed (left, above), both sides of that
// bond at once — -60 for two introverts, +40 for two extroverts, -10 for
// a mixed pair. The future only needs the occupancy of the last n filled
// cells, held as one ternary mask whose trit 0 is the left neighbour and
// trit n-1 the neighbour above, plus the two budgets left. Every state
// value stays non-negative (an introvert surrounded on all four sides
// still nets 0), so -1 cleanly marks unreachable states.
func getMaxGridHappiness(m int, n int, introvertsCount int, extrovertsCount int) int {
	width := 1
	for i := 0; i < n; i++ {
		width *= 3
	}
	span := width / 3
	pair := [3][3]int{{0, 0, 0}, {0, -60, -10}, {0, -10, 40}}
	base := [3]int{0, 120, 40}
	fresh := func() [][7][7]int {
		table := make([][7][7]int, width)
		for mask := range table {
			for i := range table[mask] {
				for e := range table[mask][i] {
					table[mask][i][e] = -1
				}
			}
		}
		return table
	}
	dp := fresh()
	dp[0][introvertsCount][extrovertsCount] = 0
	for cell := 0; cell < m*n; cell++ {
		hasLeft := cell%n != 0
		hasUp := cell >= n
		nxt := fresh()
		for mask := 0; mask < width; mask++ {
			left, up := 0, 0
			if hasLeft {
				left = mask % 3
			}
			if hasUp {
				up = mask / span % 3
			}
			shifted := mask % span * 3
			for i := 0; i < 7; i++ {
				for e := 0; e < 7; e++ {
					best := dp[mask][i][e]
					if best < 0 {
						continue
					}
					for v := 0; v <= 2; v++ {
						if (v == 1 && i == 0) || (v == 2 && e == 0) {
							continue
						}
						gain := base[v]
						if left != 0 {
							gain += pair[v][left]
						}
						if up != 0 {
							gain += pair[v][up]
						}
						ni, ne := i, e
						if v == 1 {
							ni--
						}
						if v == 2 {
							ne--
						}
						if best+gain > nxt[shifted+v][ni][ne] {
							nxt[shifted+v][ni][ne] = best + gain
						}
					}
				}
			}
		}
		dp = nxt
	}
	answer := 0
	for mask := range dp {
		for i := range dp[mask] {
			for e := range dp[mask][i] {
				if dp[mask][i][e] > answer {
					answer = dp[mask][i][e]
				}
			}
		}
	}
	return answer
}
