import "sort"

func smallestStringWithSwaps(s string, pairs [][]int) string {
	n := len(s)
	parent := make([]int, n)
	for i := range parent {
		parent[i] = i
	}

	var find func(int) int
	find = func(x int) int {
		// path halving keeps the trees shallow
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}

	// chained swaps let any two indices in one component exchange, so a
	// component's character multiset is fixed but freely permutable
	for _, pair := range pairs {
		ra := find(pair[0])
		rb := find(pair[1])
		if ra != rb {
			parent[ra] = rb
		}
	}

	groups := make(map[int][]int)
	for i := 0; i < n; i++ {
		root := find(i)
		groups[root] = append(groups[root], i)
	}

	result := []byte(s)
	// smallest characters to the smallest indices of each component;
	// components are independent so this is globally optimal
	for _, indices := range groups {
		sort.Ints(indices)
		chars := make([]byte, len(indices))
		for i, idx := range indices {
			chars[i] = result[idx]
		}
		sort.Slice(chars, func(a, b int) bool { return chars[a] < chars[b] })
		for i, idx := range indices {
			result[idx] = chars[i]
		}
	}
	return string(result)
}
