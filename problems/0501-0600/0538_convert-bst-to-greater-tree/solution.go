func convertBST(root *TreeNode) *TreeNode {
	// Reverse inorder — right subtree, node, left subtree — visits a BST's
	// keys in strictly descending order, so when the walk reaches a node,
	// every key greater than it has already been seen. The running total
	// the walk carries is therefore exactly the node's new value: the
	// original key plus the sum of all greater keys. Add the key to the
	// total, write the total back, and move on — no second pass, no
	// per-node search. The traversal carries its own stack of nodes so a
	// single 10^4-node chain never strains the goroutine call stack. Keys
	// lie in [-10^4, 10^4] and are unique, so the total never passes
	// 50005000 in magnitude; int holds it with room to spare.
	total := 0
	stack := []*TreeNode{}
	current := root
	for current != nil || len(stack) > 0 {
		// Descend the right spine stacking every node, then visit each
		// popped node and descend its left child.
		for current != nil {
			stack = append(stack, current)
			current = current.Right
		}
		current = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		total += current.Val
		current.Val = total
		current = current.Left
	}
	return root
}
