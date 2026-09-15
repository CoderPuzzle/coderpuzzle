func numSimilarGroups(strs []string) int {
	n := len(strs)
	parent := make([]int, n)
	for i := range parent {
		parent[i] = i
	}

	// Path halving keeps repeated lookups nearly constant.
	var find func(int) int
	find = func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}

	// All words are mutual anagrams, so they are similar iff they
	// differ in 0 or 2 positions — exactly what one swap fixes;
	// bail on the third mismatch.
	similar := func(a, b string) bool {
		mismatches := 0
		for i := 0; i < len(a); i++ {
			if a[i] != b[i] {
				mismatches++
				if mismatches > 2 {
					return false
				}
			}
		}
		return mismatches == 0 || mismatches == 2
	}

	// Union every similar pair: groups are the transitive closure,
	// so indirectly similar words share a root.
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if similar(strs[i], strs[j]) {
				ri, rj := find(i), find(j)
				if ri != rj {
					parent[ri] = rj
				}
			}
		}
	}

	// The answer is the number of distinct roots remaining.
	roots := make(map[int]bool)
	for i := 0; i < n; i++ {
		roots[find(i)] = true
	}
	return len(roots)
}
