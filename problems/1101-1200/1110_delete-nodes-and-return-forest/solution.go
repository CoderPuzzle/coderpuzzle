func delNodes(root *TreeNode, to_delete []int) []*TreeNode {
	deleted := make(map[int]bool, len(to_delete))
	for _, value := range to_delete {
		deleted[value] = true
	}
	forest := []*TreeNode{}
	var dfs func(*TreeNode) *TreeNode
	dfs = func(node *TreeNode) *TreeNode {
		if node == nil {
			return nil
		}
		// Recurse into both children first; the pruned results reattach
		// below, so deletions deep in the tree are already settled.
		node.Left = dfs(node.Left)
		node.Right = dfs(node.Right)
		if deleted[node.Val] {
			// This node vanishes; whichever children survived are cut
			// loose here and become new tree roots.
			if node.Left != nil {
				forest = append(forest, node.Left)
			}
			if node.Right != nil {
				forest = append(forest, node.Right)
			}
			return nil
		}
		return node
	}
	remaining := dfs(root)
	// The one surviving root no deletion created is the original root.
	if remaining != nil {
		forest = append(forest, remaining)
	}
	return forest
}
