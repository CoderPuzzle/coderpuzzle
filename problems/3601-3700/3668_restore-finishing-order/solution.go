func recoverOrder(order []int, friends []int) []int {
	// The roster is capped at eight ids, so a map answers every membership
	// test in O(1) expected time.
	wanted := make(map[int]bool, len(friends))
	for _, friend := range friends {
		wanted[friend] = true
	}
	// Scanning order left to right makes the kept ids emerge already in
	// finishing order -- no sorting step is needed.
	ans := make([]int, 0, len(friends))
	for _, racer := range order {
		if wanted[racer] {
			ans = append(ans, racer)
		}
	}
	return ans
}
