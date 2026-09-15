// Two queues of senator indices, filled in string order: the fronts are the
// earliest still-living senator of each party in the current wrap-around
// pass. Each step the two fronts fight: the smaller index acts first, bans
// the loser (popped for good), and re-enqueues itself at index + n, its
// position in the next round's pass. Every fight removes one senator
// permanently, so at most n - 1 fights decide the senate.
func predictPartyVictory(senate string) string {
	n := len(senate)
	var radiant, dire []int
	for i := 0; i < n; i++ {
		if senate[i] == 'R' {
			radiant = append(radiant, i)
		} else {
			dire = append(dire, i)
		}
	}
	// Slices resliced off their head act as FIFO queues with O(1) pops.
	for len(radiant) > 0 && len(dire) > 0 {
		r, d := radiant[0], dire[0]
		radiant, dire = radiant[1:], dire[1:]
		if r < d {
			radiant = append(radiant, r+n)
		} else {
			dire = append(dire, d+n)
		}
	}
	if len(radiant) > 0 {
		return "Radiant"
	}
	return "Dire"
}
