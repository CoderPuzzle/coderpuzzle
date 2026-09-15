func deleteNode(root *TreeNode, key int) *TreeNode {
	var del func(node *TreeNode, key int) *TreeNode
	del = func(node *TreeNode, key int) *TreeNode {
		if node == nil {
			return nil
		}
		if key < node.Val {
			// Descend by BST order, rewriting the child link so the tree
			// relinks itself on the way back up.
			node.Left = del(node.Left, key)
		} else if key > node.Val {
			node.Right = del(node.Right, key)
		} else {
			// One-child (and leaf) cases: lift the whole remaining subtree —
			// it stays on the same side of every ancestor.
			if node.Left == nil {
				return node.Right
			}
			if node.Right == nil {
				return node.Left
			}
			// Two children: adopt the in-order successor's value (minimum of
			// the right subtree). It exceeds everything on the left and is
			// minimal in the right, so the ordering is preserved.
			successor := node.Right
			for successor.Left != nil {
				successor = successor.Left
			}
			node.Val = successor.Val
			// Delete the duplicate successor; that recursive call lands on
			// a node with no left child, i.e. an easy splice.
			node.Right = del(node.Right, successor.Val)
		}
		return node
	}

	return del(root, key)
}
