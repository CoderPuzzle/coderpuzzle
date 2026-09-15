import "sort"

func numberOfWays(n int, limit []int) int64 {
	const MOD = 1_000_000_007
	m := len(limit)
	a := append([]int(nil), limit...)
	sort.Ints(a)
	// numGe(t): colors whose limit reaches t — m minus the sorted caps
	// strictly below t. The i == j diagonal of a split needs one cap to
	// cover max(x, n-x).
	numGe := func(t int) int64 {
		return int64(m - sort.SearchInts(a, t))
	}
	// Ways for one split length x: ordered pairs of distinct colors whose
	// caps cover x and n-x. Never exceeds m^2, exact in int64.
	ways := func(x int) int64 {
		wider := x
		if n-x > wider {
			wider = n - x
		}
		return numGe(x)*numGe(n-x) - numGe(wider)
	}
	// Breakpoints of the step function: x crossing 1, n, the max() switch
	// ceil(n/2), L+1 or n-L flips one num_ge term; one representative per
	// run, scaled by the run length, covers every split in 1..n-1.
	points := make([]int, 0, 2*m+3)
	points = append(points, 1, n, (n+1)/2)
	for _, cap := range a {
		for _, candidate := range []int{cap + 1, n - cap} {
			if candidate >= 1 && candidate <= n {
				points = append(points, candidate)
			}
		}
	}
	sort.Ints(points)
	unique := points[:0]
	for _, p := range points {
		if len(unique) == 0 || unique[len(unique)-1] != p {
			unique = append(unique, p)
		}
	}
	total := int64(0)
	for i := 0; i+1 < len(unique); i++ {
		run := int64(unique[i+1] - unique[i])
		total = (total + ways(unique[i])%MOD*run) % MOD
	}
	return total
}
