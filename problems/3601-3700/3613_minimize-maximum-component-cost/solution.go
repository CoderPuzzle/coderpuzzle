import "sort"

func minCost(n int, edges [][]int, k int) int {
	// k >= n lets every node sit alone: no cut is ever needed.
	if k >= n {
		return 0
	}

	feasible := func(t int) bool {
		parent := make([]int, n)
		for i := range parent {
			parent[i] = i
		}
		var find func(x int) int
		find = func(x int) int {
			for parent[x] != x {
				parent[x] = parent[parent[x]]
				x = parent[x]
			}
			return x
		}
		// Keep only edges of weight <= t: the union-find then holds exactly
		// the components left after cutting every heavier edge, and any
		// further removal only increases the count, so t works iff <= k.
		comps := n
		for _, e := range edges {
			if e[2] <= t {
				ru := find(e[0])
				rv := find(e[1])
				if ru != rv {
					parent[ru] = rv
					comps--
				}
			}
		}
		return comps <= k
	}

	// Weights are >= 1, so t = 0 keeps no edges; if even the edgeless
	// split fits in k parts, nothing needs cutting.
	if feasible(0) {
		return 0
	}
	// Feasibility is monotone in t and only changes at edge weights, so
	// binary search the sorted distinct weights for the smallest feasible.
	weightSet := map[int]struct{}{}
	for _, e := range edges {
		weightSet[e[2]] = struct{}{}
	}
	weights := make([]int, 0, len(weightSet))
	for w := range weightSet {
		weights = append(weights, w)
	}
	sort.Ints(weights)
	lo, hi := 0, len(weights)-1
	for lo < hi {
		mid := lo + (hi-lo)/2
		if feasible(weights[mid]) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return weights[lo]
}
