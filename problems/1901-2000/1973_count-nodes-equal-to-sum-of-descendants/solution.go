// A reverse preorder walk visits children before parents, so processing
// the collected nodes back-to-front lets each node's subtree sum be built
// from its children's already-computed sums. A node counts when its value
// equals the sum of its descendants, i.e. its subtree sum minus its own
// value. The traversal is fully iterative, so a 10^5-deep skewed tree
// cannot overflow any stack. Subtree sums reach 10^5 * 10^5 = 10^10, so
// they need 64 bits.
func equalToDescendants(root *TreeNode) int {
	order := []*TreeNode{}
	pending := []*TreeNode{root}
	for len(pending) > 0 {
		node := pending[len(pending)-1]
		pending = pending[:len(pending)-1]
		order = append(order, node)
		if node.Right != nil {
			pending = append(pending, node.Right)
		}
		if node.Left != nil {
			pending = append(pending, node.Left)
		}
	}
	subtree := map[*TreeNode]int64{}
	count := 0
	for i := len(order) - 1; i >= 0; i-- {
		node := order[i]
		total := int64(node.Val) + subtree[node.Left] + subtree[node.Right]
		subtree[node] = total
		if int64(node.Val) == total-int64(node.Val) {
			count++
		}
	}
	return count
}
