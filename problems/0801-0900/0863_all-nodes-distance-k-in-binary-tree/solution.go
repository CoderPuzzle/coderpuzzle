import "sort"

// Distance k counts edges on paths that may climb through parents as well
// as descend through children, so the answer can spill out of the target's
// own subtree — a downward search alone cannot reach it. One breadth-first
// pass from the root records each node's parent and collects every node,
// which also locates the node carrying the target value.
func distanceK(root *TreeNode, target int, k int) []int {
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
	var start *TreeNode
	for _, node := range order {
		if node.Val == target {
			start = node
			break
		}
	}

	// A level-synchronized walk from the target spreads one edge per step
	// through parent, left child, and right child, never revisiting a node,
	// so after k steps the frontier holds exactly the nodes at distance k.
	// Sorting the collected values settles the ascending output order the
	// statement pins.
	frontier := []*TreeNode{start}
	seen := map[*TreeNode]bool{start: true}
	for step := 0; step < k; step++ {
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
		if len(frontier) == 0 {
			break
		}
	}
	result := make([]int, 0, len(frontier))
	for _, node := range frontier {
		result = append(result, node.Val)
	}
	sort.Ints(result)
	return result
}
