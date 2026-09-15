func maxCoins(lane1 []int, lane2 []int) int64 {
	const NEG = int64(-1) << 60 // sentinel far below any reachable value
	n := len(lane1)
	// prev1[r] / prev2[r]: best coins for a ride ending at the previous mile,
	// in lane 1 / lane 2, with r lane switches still remaining.
	prev1 := [3]int64{NEG, NEG, NEG}
	prev2 := [3]int64{NEG, NEG, NEG}
	best := NEG
	for i := 0; i < n; i++ {
		v1 := int64(lane1[i])
		v2 := int64(lane2[i])
		cur1 := [3]int64{NEG, NEG, NEG}
		cur2 := [3]int64{NEG, NEG, NEG}
		// fresh start at mile i (enter on lane 1, may switch immediately)
		if v1 > cur1[2] {
			cur1[2] = v1
		}
		if v2 > cur2[1] {
			cur2[1] = v2
		}
		for r := 0; r < 3; r++ {
			if prev1[r] != NEG {
				if prev1[r]+v1 > cur1[r] { // stay in lane 1
					cur1[r] = prev1[r] + v1
				}
				if r > 0 && prev1[r]+v2 > cur2[r-1] { // switch to lane 2
					cur2[r-1] = prev1[r] + v2
				}
			}
			if prev2[r] != NEG {
				if prev2[r]+v2 > cur2[r] { // stay in lane 2
					cur2[r] = prev2[r] + v2
				}
				if r > 0 && prev2[r]+v1 > cur1[r-1] { // switch to lane 1
					cur1[r-1] = prev2[r] + v1
				}
			}
		}
		prev1 = cur1
		prev2 = cur2
		for r := 0; r < 3; r++ {
			if prev1[r] > best {
				best = prev1[r]
			}
			if prev2[r] > best {
				best = prev2[r]
			}
		}
	}
	return best
}
