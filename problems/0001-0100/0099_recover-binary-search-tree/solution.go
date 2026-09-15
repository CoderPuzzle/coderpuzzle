func recoverTree(root *TreeNode) *TreeNode {
	var prev, first, second *TreeNode
	stack := []*TreeNode{}
	node := root
	// Loop invariant: `stack` holds the ancestors whose left subtrees are
	// still being descended into; `node` is the next subtree to process
	// (nil means it is time to pop back up instead). Inorder of a healthy
	// BST is strictly ascending, so a predecessor greater than its successor
	// marks a misplaced pair: the node before the FIRST descent and after
	// the LAST descent are the two swapped nodes.
	for node != nil || len(stack) > 0 {
		// Descend the left spine, remembering every node on it.
		for node != nil {
			stack = append(stack, node)
			node = node.Left
		}
		node = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if prev != nil && prev.Val > node.Val {
			if first == nil {
				first = prev
			}
			second = node
		}
		prev = node
		node = node.Right
	}
	// Swap only values: nodes and links stay put ("without changing its
	// structure"), and the repaired root flows back to the judge.
	first.Val, second.Val = second.Val, first.Val
	return root
}
