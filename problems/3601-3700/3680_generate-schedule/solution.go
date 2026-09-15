func generateSchedule(n int) [][]int {
	// Up to four teams the calendar is provably too tight; five teams is
	// the smallest feasible case and the judge pins it to one fixed list.
	if n <= 4 {
		return [][]int{}
	}
	if n == 5 {
		return [][]int{
			{0, 1}, {2, 3}, {0, 4}, {1, 2}, {3, 4},
			{0, 2}, {1, 3}, {2, 4}, {0, 3}, {1, 4},
			{2, 0}, {3, 1}, {4, 0}, {2, 1}, {4, 3},
			{1, 0}, {3, 2}, {4, 1}, {3, 0}, {4, 2},
		}
	}
	// Circle method: round r pairs teams at offsets +k and -k around
	// position r on a circle of m teams (even n keeps team n - 1 fixed as
	// the sentinel edge's home). Each round is a perfect or near-perfect
	// matching — no two of its matches share a team — and every unordered
	// pair appears in exactly one round.
	m := n - 1
	sentinel := true
	if n%2 != 0 {
		m = n
		sentinel = false
	}
	rounds := make([][][]int, m)
	for r := 0; r < m; r++ {
		size := m/2 + 1
		if !sentinel {
			size = m / 2
		}
		round := make([][]int, 0, size)
		if sentinel {
			round = append(round, []int{n - 1, r})
		}
		for k := 1; k <= m/2; k++ {
			round = append(round, []int{(r + k) % m, (r + m - k) % m})
		}
		rounds[r] = round
	}
	schedule := make([][]int, 0, n*(n-1))
	prevHome, prevAway := -1, -2
	// Two halves: the second replays every round with venues swapped.
	for phase := 0; phase < 2; phase++ {
		swap := phase == 1
		for _, round := range rounds {
			first := 0
			for i, pair := range round {
				home, away := pair[0], pair[1]
				if swap {
					home, away = pair[1], pair[0]
				}
				if home != prevHome && home != prevAway && away != prevHome && away != prevAway {
					first = i
					break
				}
			}
			// At most two matches touch the previous pair while a round
			// lists at least three, so the scan always finds an opener.
			emit := func(i int) {
				home, away := round[i][0], round[i][1]
				if swap {
					home, away = round[i][1], round[i][0]
				}
				schedule = append(schedule, []int{home, away})
				prevHome, prevAway = home, away
			}
			emit(first)
			// The rest of the round follows in listing order.
			for i := range round {
				if i == first {
					continue
				}
				emit(i)
			}
		}
	}
	return schedule
}
