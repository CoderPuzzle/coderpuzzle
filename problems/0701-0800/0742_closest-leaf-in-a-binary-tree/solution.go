// Distance here runs over the tree's edges as an undirected graph: the
// nearest leaf may sit in another subtree, up through parents and across
// the root, so a descending search alone cannot prove a leaf nearest. One
// breadth-first pass from the root records each node's parent and
// collects every node, which also locates k.
func findClosestLeaf(root *TreeNode, k int) int {
	parents := make(map[*TreeNode]*TreeNode)
	order := []*TreeNode{}
	if root != nil {
		order = append(order, root)
	}
	for head := 0; head < len(order); head++ {
		node := order[head]
		if node.Left != nil {
			parents[node.Left] = node
			order = append(order, node.Left)
		}
		if node.Right != nil {
			parents[node.Right] = node
			order = append(order, node.Right)
		}
	}
	var target *TreeNode
	for _, node := range order {
		if node.Val == k {
			target = node
			break
		}
	}

	// A level-synchronized walk from the k node spreads one edge per step
	// through parent, left child, and right child. The first level holding
	// a leaf holds every nearest leaf; the smallest value among them
	// settles the tie rule.
	frontier := []*TreeNode{target}
	seen := map[*TreeNode]bool{target: true}
	for {
		best, leafFound := 0, false
		for _, node := range frontier {
			if node.Left == nil && node.Right == nil && (!leafFound || node.Val < best) {
				best = node.Val
				leafFound = true
			}
		}
		if leafFound {
			return best
		}
		reached := []*TreeNode{}
		for _, node := range frontier {
			if parent := parents[node]; parent != nil && !seen[parent] {
				seen[parent] = true
				reached = append(reached, parent)
			}
			if node.Left != nil && !seen[node.Left] {
				seen[node.Left] = true
				reached = append(reached, node.Left)
			}
			if node.Right != nil && !seen[node.Right] {
				seen[node.Right] = true
				reached = append(reached, node.Right)
			}
		}
		frontier = reached
	}
}
