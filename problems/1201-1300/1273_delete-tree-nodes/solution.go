func deleteTreeNodes(nodes int, parent []int, value []int) int {
	// Fold bottom-up: each node hands its parent its subtree sum and the
	// number of kept nodes below it — but only if its own subtree sum
	// survived as nonzero. A zero-sum subtree contributes nothing to
	// either, which is exactly the cascade: its values stop counting
	// toward every ancestor's sum too.
	children := make([][]int, nodes)
	for i, p := range parent {
		if p >= 0 {
			children[p] = append(children[p], i)
		}
	}
	order := make([]int, 0, nodes)
	order = append(order, 0)
	for head := 0; head < len(order); head++ {
		for _, child := range children[order[head]] {
			order = append(order, child)
		}
	}
	subSum := make([]int64, nodes)
	kept := make([]int, nodes)
	for i := range nodes {
		subSum[i] = int64(value[i])
		kept[i] = 1
	}
	for i := nodes - 1; i >= 0; i-- {
		node := order[i]
		if p := parent[node]; p >= 0 && subSum[node] != 0 {
			subSum[p] += subSum[node]
			kept[p] += kept[node]
		}
	}
	if subSum[0] != 0 {
		return kept[0]
	}
	return 0
}
