import "sort"

func maxWalls(robots []int, distance []int, walls []int) int {
	// Sort robots by position (carrying each range along) and sort the wall
	// positions once: every reachable set below is then counted with two
	// binary searches instead of a scan.
	type bot struct {
		pos int
		rng int
	}
	bots := make([]bot, len(robots))
	for i := range robots {
		bots[i] = bot{robots[i], distance[i]}
	}
	sort.Slice(bots, func(a, b int) bool { return bots[a].pos < bots[b].pos })
	sort.Ints(walls)
	count := func(lo, hi int) int {
		// How many walls lie in the closed interval [lo, hi].
		if lo > hi {
			return 0
		}
		return sort.SearchInts(walls, hi+1) - sort.SearchInts(walls, lo)
	}
	// Firing left the bullet stops at the previous robot; a wall on the
	// blocker's position survives (only the blocker itself can destroy it).
	leftLo := func(i int) int {
		lo := bots[i].pos - bots[i].rng
		if i > 0 && bots[i-1].pos+1 > lo {
			lo = bots[i-1].pos + 1
		}
		return lo
	}
	// Firing right the bullet stops at the next robot.
	rightHi := func(i int) int {
		hi := bots[i].pos + bots[i].rng
		if i+1 < len(bots) && bots[i+1].pos-1 < hi {
			hi = bots[i+1].pos - 1
		}
		return hi
	}
	// prevLeft / prevRight: best totals for the robots already decided when
	// the last of them fired left / right.
	prevLeft := count(leftLo(0), bots[0].pos)
	prevRight := count(bots[0].pos, rightHi(0))
	for i := 1; i < len(bots); i++ {
		pos := bots[i].pos
		hereLeft := count(leftLo(i), pos)
		hereRight := count(pos, rightHi(i))
		// Facing shots share the gap: when this robot fires left and the
		// previous one fired right, the walls both bullets reach were
		// already counted and must not count twice.
		shared := count(leftLo(i), min(bots[i-1].pos+bots[i-1].rng, pos-1))
		best := max(prevLeft, prevRight)
		prevLeft = max(prevLeft+hereLeft, prevRight+hereLeft-shared)
		// A rightward shot can never overlap anything already decided.
		prevRight = best + hereRight
	}
	return max(prevLeft, prevRight)
}
