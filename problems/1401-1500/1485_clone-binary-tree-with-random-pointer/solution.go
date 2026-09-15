func copyRandomBinaryTree(root *RandomTreeNode) *RandomTreeNode {
	if root == nil {
		return nil
	}
	// Weave: every original node's left slot comes to hold its own clone,
	// and the clone's left holds the original's former left child, so the
	// original structure stays walkable one step down.
	stack := []*RandomTreeNode{root}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		clone := &RandomTreeNode{Val: node.Val}
		left := node.Left
		clone.Left = left
		node.Left = clone
		if left != nil {
			stack = append(stack, left)
		}
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
	}
	// Far links: an original's clone is node.Left, so the clone of anything
	// the original points across to — its random target and its right child
	// — is that target's own left.
	stack = []*RandomTreeNode{root}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		clone := node.Left
		if node.Random != nil {
			clone.Random = node.Random.Left
		}
		right := node.Right
		if right != nil {
			clone.Right = right.Left
			stack = append(stack, right)
		}
		if clone.Left != nil {
			stack = append(stack, clone.Left)
		}
	}
	answer := root.Left
	// Split: restore each original's left child and hand the clone the clone
	// of that subtree.
	stack = []*RandomTreeNode{root}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		clone := node.Left
		left := clone.Left
		if left != nil {
			clone.Left = left.Left
		}
		node.Left = left
		if left != nil {
			stack = append(stack, left)
		}
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
	}
	return answer
}
