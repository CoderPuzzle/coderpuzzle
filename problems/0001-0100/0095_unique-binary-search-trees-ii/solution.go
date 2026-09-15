func generateTrees(n int) []*TreeNode {
	return build(1, n)
}

func build(lo, hi int) []*TreeNode {
	// An empty range still offers one choice: the null subtree.
	if lo > hi {
		return []*TreeNode{nil}
	}
	trees := make([]*TreeNode, 0)
	for root := lo; root <= hi; root++ {
		lefts := build(lo, root-1)
		rights := build(root+1, hi)
		// Left choices vary slower than right choices, so the loop
		// nesting emits the trees in the order the statement pins.
		for _, left := range lefts {
			for _, right := range rights {
				node := &TreeNode{Val: root}
				node.Left = left
				node.Right = right
				trees = append(trees, node)
			}
		}
	}
	return trees
}
