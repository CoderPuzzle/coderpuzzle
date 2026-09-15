import "sort"

func minMoves(balance []int) int64 {
	// At most one person is negative. With none, nobody moves; with a
	// negative total, no arrangement can work. Otherwise every unit a
	// giver releases costs one move per hop of its circular distance
	// to the negative index, so draining the deficit from the nearest
	// givers first — cheapest distance, then the next, and so on —
	// totals the minimum. Moves reach ~1e14, hence int64.
	n := len(balance)
	neg := -1
	for i := 0; i < n; i++ {
		if balance[i] < 0 {
			neg = i
			break
		}
	}
	if neg == -1 {
		return 0
	}
	total := 0
	for _, v := range balance {
		total += v
	}
	if total < 0 {
		return -1
	}
	type supply struct {
		dist   int
		amount int64
	}
	supplies := []supply{}
	for i := 0; i < n; i++ {
		if i != neg && balance[i] > 0 {
			cw := (i - neg + n) % n
			ccw := (neg - i + n) % n
			d := cw
			if ccw < d {
				d = ccw
			}
			supplies = append(supplies, supply{d, int64(balance[i])})
		}
	}
	sort.Slice(supplies, func(p, q int) bool {
		return supplies[p].dist < supplies[q].dist
	})
	need := int64(-balance[neg])
	var moves int64
	for _, s := range supplies {
		if need == 0 {
			break
		}
		take := s.amount
		if need < take {
			take = need
		}
		moves += take * int64(s.dist)
		need -= take
	}
	return moves
}
