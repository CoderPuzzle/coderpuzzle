// A card printed with the same number on both faces shows that number no
// matter which way it is flipped, so that number can never be good. Any other
// printed number can be good: rest one card carrying it with that side down,
// and every other card — at most one of its two faces carries the number —
// hides it face down. The flips are independent, so nothing else has to be
// planned: the answer is the smallest printed number that no both-faces card
// forces upward.
func flipgame(fronts []int, backs []int) int {
	forced := map[int]bool{}
	for i, f := range fronts {
		if f == backs[i] {
			forced[f] = true
		}
	}
	best := 0
	for _, value := range fronts {
		if !forced[value] && (best == 0 || value < best) {
			best = value
		}
	}
	for _, value := range backs {
		if !forced[value] && (best == 0 || value < best) {
			best = value
		}
	}
	return best
}
