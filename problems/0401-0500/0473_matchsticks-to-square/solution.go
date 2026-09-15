import "sort"

func makesquare(matchsticks []int) bool {
	total := 0
	for _, v := range matchsticks {
		total += v
	}
	// A square is 4 equal-length groups: the total must split evenly and
	// no single stick may exceed the side.
	if total%4 != 0 {
		return false
	}
	side := total / 4
	// Descending order places the most constrained sticks first, so a dead
	// end appears after only a few branches.
	sticks := make([]int, len(matchsticks))
	copy(sticks, matchsticks)
	sort.Sort(sort.Reverse(sort.IntSlice(sticks)))
	if len(sticks) == 0 || sticks[0] > side {
		return false
	}
	sides := []int{0, 0, 0, 0}

	var dfs func(i int) bool
	dfs = func(i int) bool {
		if i == len(sticks) {
			// Guaranteed by the capacity checks + total = 4 * side; kept
			// as a final safety assertion.
			return sides[0] == side && sides[1] == side && sides[2] == side && sides[3] == side
		}
		value := sticks[i]
		var tried []int
		for j := 0; j < 4; j++ {
			// Sides with equal current length are interchangeable — trying
			// one per distinct length skips symmetric states.
			dup := false
			for _, t := range tried {
				if t == sides[j] {
					dup = true
					break
				}
			}
			if dup {
				continue
			}
			tried = append(tried, sides[j])
			// Place/recurse/undo on every side with room left.
			if sides[j]+value <= side {
				sides[j] += value
				if dfs(i + 1) {
					return true
				}
				sides[j] -= value
			}
		}
		return false
	}

	return dfs(0)
}
