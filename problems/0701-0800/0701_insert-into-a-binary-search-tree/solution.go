func insertIntoBST(root *TreeNode, val int) *TreeNode {
	// The value is guaranteed absent, so a search for it must fail — and
	// where it fails is the answer: descend right when val is greater,
	// left otherwise, until the child slot ahead is empty, then hang a
	// fresh leaf there. Every ancestor on that path already brackets val
	// on the correct side, and any empty slot off the path lies in a
	// subtree whose root's value excludes val — so the slot is forced and
	// no restructuring is ever needed.
	if root == nil {
		// An empty tree never enters the loop: the fresh node is the root
		// handed back to the caller.
		return &TreeNode{Val: val}
	}
	node := root
	// The descent iterates so a single 10^4-node chain never strains the
	// goroutine call stack.
	for {
		if val > node.Val {
			if node.Right == nil {
				node.Right = &TreeNode{Val: val}
				return root
			}
			node = node.Right
		} else {
			if node.Left == nil {
				node.Left = &TreeNode{Val: val}
				return root
			}
			node = node.Left
		}
	}
}
