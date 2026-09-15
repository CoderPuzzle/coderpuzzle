import "sort"

func sortItems(n int, m int, group []int, beforeItems [][]int) []int {
	grp := make([]int, n)
	copy(grp, group)
	total := m
	for i := 0; i < n; i++ {
		if grp[i] == -1 {
			grp[i] = total
			total++
		}
	}

	itemAdj := make([][]int, n)
	groupAdj := make([][]int, total)
	groupIndeg := make([]int, total)
	for i := 0; i < n; i++ {
		for _, b := range beforeItems[i] {
			itemAdj[b] = append(itemAdj[b], i)
			gb, gi := grp[b], grp[i]
			if gb != gi {
				groupAdj[gb] = append(groupAdj[gb], gi)
				groupIndeg[gi]++
			}
		}
	}

	// LIFO Kahn: stack initialized in descending id order so the smallest
	// zero-indegree id pops first; newly available nodes are pushed on top.
	kahn := func(keys []int, adj [][]int, indeg []int) []int {
		ind := make([]int, len(indeg))
		copy(ind, indeg)
		available := []int{}
		for _, k := range keys {
			if ind[k] == 0 {
				available = append(available, k)
			}
		}
		sort.Sort(sort.Reverse(sort.IntSlice(available)))
		order := []int{}
		for len(available) > 0 {
			u := available[len(available)-1]
			available = available[:len(available)-1]
			order = append(order, u)
			for _, v := range adj[u] {
				ind[v]--
				if ind[v] == 0 {
					available = append(available, v)
				}
			}
		}
		if len(order) != len(keys) {
			return nil
		}
		return order
	}

	keys := make([]int, total)
	for i := range keys {
		keys[i] = i
	}
	groupOrder := kahn(keys, groupAdj, groupIndeg)
	if groupOrder == nil {
		return []int{}
	}

	itemsInGroup := make([][]int, total)
	for i := 0; i < n; i++ {
		itemsInGroup[grp[i]] = append(itemsInGroup[grp[i]], i)
	}

	result := []int{}
	indeg2 := make([]int, n)
	adj2 := make([][]int, n)
	for _, g := range groupOrder {
		nodes := itemsInGroup[g]
		if len(nodes) == 0 {
			continue
		}
		for _, u := range nodes {
			indeg2[u] = 0
			adj2[u] = adj2[u][:0]
		}
		for _, u := range nodes {
			for _, v := range itemAdj[u] {
				if grp[v] == g {
					adj2[u] = append(adj2[u], v)
					indeg2[v]++
				}
			}
		}
		order := kahn(nodes, adj2, indeg2)
		if order == nil {
			return []int{}
		}
		result = append(result, order...)
	}
	return result
}
