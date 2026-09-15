func groupStrings(words []string) []int {
	maskCounter := make(map[int]int)
	for _, w := range words {
		mask := 0
		for k := 0; k < len(w); k++ {
			mask |= 1 << (w[k] - 'a')
		}
		maskCounter[mask]++
	}

	masks := make([]int, 0, len(maskCounter))
	for m := range maskCounter {
		masks = append(masks, m)
	}
	present := make(map[int]bool, len(masks))
	index := make(map[int]int, len(masks))
	for k, m := range masks {
		present[m] = true
		index[m] = k
	}
	sz := len(masks)
	parent := make([]int, sz)
	sizeCount := make([]int, sz)
	for k, m := range masks {
		parent[k] = k
		sizeCount[k] = maskCounter[m]
	}

	var find func(int) int
	find = func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}
	unionIdx := func(a, b int) {
		ra, rb := find(a), find(b)
		if ra != rb {
			parent[rb] = ra
			sizeCount[ra] += sizeCount[rb]
		}
	}

	full := (1 << 26) - 1
	for k, mask := range masks {
		// Add / delete one letter: masks differing in exactly one bit.
		for bit := 0; bit < 26; bit++ {
			neighbor := mask ^ (1 << bit)
			if present[neighbor] {
				unionIdx(k, index[neighbor])
			}
		}
		// Replace one letter: remove a present bit, add an absent bit.
		absent := full &^ mask
		removable := mask
		for removable != 0 {
			low := removable & -removable
			removable ^= low
			base := mask &^ low
			addable := absent
			for addable != 0 {
				low2 := addable & -addable
				addable ^= low2
				neighbor := base | low2
				if present[neighbor] {
					unionIdx(k, index[neighbor])
				}
			}
		}
	}

	roots := make(map[int]bool)
	for k := 0; k < sz; k++ {
		roots[find(k)] = true
	}
	largest := 0
	for k := 0; k < sz; k++ {
		if find(k) == k {
			if sizeCount[k] > largest {
				largest = sizeCount[k]
			}
		}
	}
	return []int{len(roots), largest}
}
