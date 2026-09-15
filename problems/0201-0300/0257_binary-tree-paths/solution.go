import "strconv"

func binaryTreePaths(root *TreeNode) []string {
	paths := []string{}
	// Pre-order walk carrying the half-built string: each step appends
	// "->" and the child's value, and a leaf commits the whole path.
	var walk func(node *TreeNode, path string)
	walk = func(node *TreeNode, path string) {
		extended := path + strconv.Itoa(node.Val)
		// A leaf is a node with no children — both absent. A node with
		// only one child is a pass-through, never a terminal.
		if node.Left == nil && node.Right == nil {
			paths = append(paths, extended)
			return
		}
		// Left subtree before right, so paths are emitted in the order
		// the pinned depth-first walk meets the leaves.
		if node.Left != nil {
			walk(node.Left, extended+"->")
		}
		if node.Right != nil {
			walk(node.Right, extended+"->")
		}
	}
	// The constraints guarantee at least one node, so root is never nil.
	walk(root, "")
	return paths
}
