import "sort"

func maximumTastiness(price []int, k int) int {
	// In a sorted selection the minimum pairwise gap always occurs between
	// adjacent picks, so sorting once reduces the problem to chain gaps.
	p := append([]int(nil), price...)
	sort.Ints(p)
	feasible := func(x int) bool {
		// Leftmost greedy: take the first candy, then each candy at least x
		// above the last taken one. Postponing a pick can only shrink the room
		// for later picks, so this maximizes how many candies fit.
		count := 1
		last := p[0]
		for _, v := range p[1:] {
			if v-last >= x {
				count++
				last = v
			}
		}
		return count >= k
	}
	// "Every gap >= x is achievable" is monotone in x, so binary search the
	// largest feasible x over [0, max-min]; the upper-mid +1 keeps lo = mid
	// from stalling. Identical prices converge to lo = 0.
	lo, hi := 0, p[len(p)-1]-p[0]
	for lo < hi {
		mid := lo + (hi-lo+1)/2
		if feasible(mid) {
			lo = mid
		} else {
			hi = mid - 1
		}
	}
	return lo
}
