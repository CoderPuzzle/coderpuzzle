func findTarget(root *TreeNode, k int) bool {
	// A value pairs with k minus itself, so the whole question is set
	// membership: keep every value already visited in a hash set, and each
	// new node learns with one lookup whether its partner came earlier.
	// The lookup comes before the insert — the ordering that forbids a
	// node pairing with itself, so a k equal to twice a value that occurs
	// once stays false. The visiting order is irrelevant: any traversal
	// that reaches every node sees one member of a summing pair before
	// the other, so a plain preorder returns true at the first hit and
	// false only after the whole tree is exhausted. The walk carries its
	// own stack of nodes so a single 10^4-node chain never strains the
	// goroutine call stack.
	seen := map[int]bool{}
	stack := []*TreeNode{root}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if seen[k-node.Val] {
			return true
		}
		seen[node.Val] = true
		if node.Left != nil {
			stack = append(stack, node.Left)
		}
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
	}
	return false
}
