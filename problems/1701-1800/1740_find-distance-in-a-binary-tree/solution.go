// One iterative pass — an explicit stack, never recursion, since a
// skewed tree runs 10^4 nodes deep — records each value's depth and
// parent. Values are unique, so a value keys both maps. The distance
// then resolves through the lowest common ancestor: lift the deeper of
// p and q to the other's depth, walk both up in lockstep until they
// meet — that meeting point is the LCA — and return depth[p] +
// depth[q] - 2*depth[lca], each leg of the path counted once. p == q
// needs no special case: the lifts make no move, the walk finds the
// two already equal, and the formula cancels to 0. The root records
// itself as its own parent; no climb ever passes the LCA, which is at
// the latest the root, so the sentinel is never followed.
func findDistance(root *TreeNode, p int, q int) int {
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
	a, b := p, q
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
	return depthOf[p] + depthOf[q] - 2*depthOf[a]
}
