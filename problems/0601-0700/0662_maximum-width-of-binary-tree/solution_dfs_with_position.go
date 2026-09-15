func widthOfBinaryTree(root *TreeNode) int {
	best := 0
	// Depth -> {leftmost, rightmost} frame positions seen at that depth
	// — the two running extremes; the null slots between the end nodes
	// are counted by the arithmetic, never materialized.
	type span struct {
		lo, hi int64
	}
	extremes := map[int]span{}
	// One stack entry: a node riding with its depth and index. Popping
	// the back, and pushing the right child before the left, walks the
	// tree root-first, left subtree before right — preorder, which
	// visits every depth in index order.
	type frame struct {
		node  *TreeNode
		depth int
		pos   int64
	}
	stack := []frame{}
	if root != nil {
		stack = append(stack, frame{root, 0, 0})
	}
	for len(stack) > 0 {
		item := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		ext, ok := extremes[item.depth]
		if !ok {
			ext = span{item.pos, item.pos}
		}
		if item.pos < ext.lo {
			ext.lo = item.pos
		}
		if item.pos > ext.hi {
			ext.hi = item.pos
		}
		extremes[item.depth] = ext
		if width := ext.hi - ext.lo + 1; width > int64(best) {
			best = int(width)
		}
		// Re-base before doubling: raw heap indices double per level
		// and blow past 64 bits on a deep chain. Shifted so the level
		// starts at its leftmost node, a stored index never exceeds
		// twice the level's width; a width is a difference within one
		// level, and the shift leaves every such difference unchanged.
		rebased := item.pos - ext.lo
		if item.node.Right != nil {
			stack = append(stack, frame{item.node.Right, item.depth + 1, 2*rebased + 1})
		}
		if item.node.Left != nil {
			stack = append(stack, frame{item.node.Left, item.depth + 1, 2 * rebased})
		}
	}
	return best
}
