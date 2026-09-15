func findLeaves(root *TreeNode) [][]int {
	groups := [][]int{}
	// Post-order: each call reports the height of the subtree rooted at
	// node (a leaf is height 0) and files the node's value into that
	// height's group as the recursion unwinds — collecting leaves round by
	// round is just sorting the nodes by height, and finishing the left
	// subtree before entering the right one pins each group to
	// left-to-right order.
	var height func(node *TreeNode) int
	height = func(node *TreeNode) int {
		if node == nil {
			return -1
		}
		nodeHeight := 1 + max(height(node.Left), height(node.Right))
		// A first sighting of a height always arrives after every smaller
		// height has been seen, so this grows the slice by exactly one.
		if nodeHeight == len(groups) {
			groups = append(groups, nil)
		}
		groups[nodeHeight] = append(groups[nodeHeight], node.Val)
		return nodeHeight
	}
	height(root)
	return groups
}
