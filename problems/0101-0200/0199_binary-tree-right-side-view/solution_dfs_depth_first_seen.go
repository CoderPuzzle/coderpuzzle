type frame struct {
	node  *TreeNode
	depth int
}

func rightSideView(root *TreeNode) []int {
	// Depth-first with the right child tried first: at every depth the
	// first node popped is the rightmost one there, the node the right
	// edge sees.
	view := []int{}
	stack := []frame{}
	if root != nil {
		stack = append(stack, frame{root, 0})
	}
	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		// A depth earns its entry only on that first arrival; every later
		// node popped at the same depth sits further left.
		if top.depth == len(view) {
			view = append(view, top.node.Val)
		}
		// Left pushed before right, so the right child pops first.
		if top.node.Left != nil {
			stack = append(stack, frame{top.node.Left, top.depth + 1})
		}
		if top.node.Right != nil {
			stack = append(stack, frame{top.node.Right, top.depth + 1})
		}
	}
	return view
}
