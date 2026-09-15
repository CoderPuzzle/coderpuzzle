// One iterative pass — an explicit stack, never recursion, since a
// skewed tree runs 10^4 nodes deep — records each value's depth and
// parent. Values are unique, so a value keys both maps. The answer then
// folds pairwise over the query values: hold the running LCA candidate,
// and for each further value lift the deeper of the two to the other's
// depth, then walk both up in lockstep until they meet. The LCA is
// associative — the LCA of the whole list is the LCA of the running
// candidate and each new value — so the fold lands on the shared
// ancestor, and a one-value query returns that value untouched. The
// root records itself as its own parent; no climb ever passes the LCA,
// which is at the latest the root, so the sentinel is never followed.
func lowestCommonAncestor(root *TreeNode, nodes []int) int {
	depthOf := map[int]int{root.Val: 0}
	parentOf := map[int]int{root.Val: root.Val}
	pending := []*TreeNode{root}
	for len(pending) > 0 {
		node := pending[len(pending)-1]
		pending = pending[:len(pending)-1]
		childDepth := depthOf[node.Val] + 1
		if node.Left != nil {
			depthOf[node.Left.Val] = childDepth
			parentOf[node.Left.Val] = node.Val
			pending = append(pending, node.Left)
		}
		if node.Right != nil {
			depthOf[node.Right.Val] = childDepth
			parentOf[node.Right.Val] = node.Val
			pending = append(pending, node.Right)
		}
	}
	lca := nodes[0]
	for _, value := range nodes[1:] {
		a, b := lca, value
		for depthOf[a] > depthOf[b] {
			a = parentOf[a]
		}
		for depthOf[b] > depthOf[a] {
			b = parentOf[b]
		}
		for a != b {
			a = parentOf[a]
			b = parentOf[b]
		}
		lca = a
	}
	return lca
}
