func minSwapsCouples(row []int) int {
	n := len(row)
	pos := make([]int, n)
	for i, value := range row {
		pos[value] = i
	}

	slots := n / 2
	parent := make([]int, slots)
	size := make([]int, slots)
	for s := 0; s < slots; s++ {
		parent[s] = s
		size[s] = 1
	}

	find := func(a int) int {
		root := a
		for parent[root] != root {
			root = parent[root]
		}
		for parent[a] != root {
			// path compression: point every visited node at the root
			parent[a], a = root, parent[a]
		}
		return root
	}

	groups := slots
	for v := 0; v < n; v += 2 {
		// each partner pair (v, v ^ 1) links its two slots
		a := find(pos[v] / 2)
		b := find(pos[v^1] / 2)
		if a == b {
			continue
		}
		if size[a] < size[b] { // union by size: hang the smaller tree under the larger
			parent[a] = b
			size[b] += size[a]
		} else {
			parent[b] = a
			size[a] += size[b]
		}
		groups--
	}
	return slots - groups
}
