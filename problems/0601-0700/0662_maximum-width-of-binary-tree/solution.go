func widthOfBinaryTree(root *TreeNode) int {
	best := 0
	// One queue entry: a node riding with its index.
	type slot struct {
		node  *TreeNode
		index int64
	}
	queue := []slot{}
	if root != nil {
		queue = append(queue, slot{root, 0})
	}
	for len(queue) > 0 {
		// The queue holds exactly one level, in index order, so its
		// end nodes' indices give the level's width directly — the
		// null slots between them are counted by the arithmetic,
		// never materialized.
		width := queue[len(queue)-1].index - queue[0].index + 1
		if width > int64(best) {
			best = int(width)
		}
		// Re-base before doubling: raw heap indices double per level
		// and blow past 64 bits on a deep chain. Shifted so the level
		// starts at 0, a stored index never exceeds twice the level's
		// width; a width is a difference within one level, and the
		// shift leaves every such difference unchanged.
		base := queue[0].index
		remaining := len(queue)
		for i := 0; i < remaining; i++ {
			item := queue[i]
			index := item.index - base
			if item.node.Left != nil {
				queue = append(queue, slot{item.node.Left, 2 * index})
			}
			if item.node.Right != nil {
				queue = append(queue, slot{item.node.Right, 2*index + 1})
			}
		}
		queue = queue[remaining:]
	}
	return best
}
