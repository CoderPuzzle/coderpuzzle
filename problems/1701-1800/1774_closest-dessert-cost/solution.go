// Reachable topping totals: start from {0}; each topping price t maps
// every sum s to s, s + t, s + 2t. Scanning that set against every base,
// the best dessert cost minimizes |b + s - target|, ties broken toward
// the smaller cost.
func closestCost(baseCosts []int, toppingCosts []int, target int) int {
	sums := map[int]bool{0: true}
	for _, t := range toppingCosts {
		next := make(map[int]bool, len(sums)*3)
		for s := range sums {
			next[s] = true
			next[s+t] = true
			next[s+2*t] = true
		}
		sums = next
	}
	best := 0
	bestDist := 1 << 30
	for _, b := range baseCosts {
		for s := range sums {
			cost := b + s
			dist := cost - target
			if dist < 0 {
				dist = -dist
			}
			if dist < bestDist || (dist == bestDist && cost < best) {
				bestDist = dist
				best = cost
			}
		}
	}
	return best
}
