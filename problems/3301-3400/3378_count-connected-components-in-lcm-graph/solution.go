func countComponents(nums []int, threshold int) int {
	// Every edge needs lcm(nums[i], nums[j]) <= threshold, and the lcm
	// is a multiple of both values, so values above the threshold are
	// isolated singletons. Enumerate present values ascending, keeping
	// anchor[m] = the smallest present divisor of each multiple m:
	// every later present divisor of m unions with it, and since both
	// divide m the edge is genuine (lcm | m <= threshold). Every
	// genuine edge (a, b) is covered at m = lcm(a, b). The scans cost
	// the harmonic sum ~threshold*ln(threshold). Iterative DSU with
	// path halving and union by size; values up to 1e9 are never
	// multiplied and the answer fits 32 bits.
	n := len(nums)
	parent := make([]int, n)
	size := make([]int, n)
	for i := range parent {
		parent[i] = i
		size[i] = 1
	}
	var find func(int) int
	find = func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}
	union := func(a, b int) {
		ra, rb := find(a), find(b)
		if ra == rb {
			return
		}
		if size[ra] < size[rb] {
			ra, rb = rb, ra
		}
		parent[rb] = ra
		size[ra] += size[rb]
	}
	present := make([]int, threshold+1)
	for i := range present {
		present[i] = -1
	}
	for i, v := range nums {
		if v <= threshold {
			present[v] = i
		}
	}
	anchor := make([]int, threshold+1)
	for i := range anchor {
		anchor[i] = -1
	}
	for v := 1; v <= threshold; v++ {
		i := present[v]
		if i < 0 {
			continue
		}
		if a := anchor[v]; a >= 0 {
			union(i, a)
		}
		for m := 2 * v; m <= threshold; m += v {
			if a := anchor[m]; a >= 0 {
				union(i, a)
			} else {
				anchor[m] = i
			}
		}
	}
	comps := 0
	for i := 0; i < n; i++ {
		if find(i) == i {
			comps++
		}
	}
	return comps
}
