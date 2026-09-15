// A subtree hangs from some node of root and takes every descendant below
// it, so the question splits in two: an equality test that settles whether
// two trees agree in value and shape, and an anchor walk that tries that
// test rooted at every node of root. Both walks carry their own stacks: a
// skewed 2000-node root would nest 2000 calls — past CPython's default
// recursion limit of 1000 — and a 1000-node subRoot chain would sit exactly
// at that edge, so every runtime iterates instead. The anchor walk pops a
// node, tries the test rooted there, and stacks its children; the first
// accepting anchor answers the whole question.
func isSubtree(root *TreeNode, subRoot *TreeNode) bool {
	anchors := []*TreeNode{root}
	for len(anchors) > 0 {
		node := anchors[len(anchors)-1]
		anchors = anchors[:len(anchors)-1]
		if sameTree(node, subRoot) {
			return true
		}
		if node.Left != nil {
			anchors = append(anchors, node.Left)
		}
		if node.Right != nil {
			anchors = append(anchors, node.Right)
		}
	}
	return false
}

// One stack entry settles one aligned node pair: two missing subtrees match,
// exactly one missing is a shape difference no value can repair — `left ==
// right` holds only when both are nil — and when both exist their values
// must agree here while both child pairs join the stack for the same
// treatment. An exhausted stack means every pair agreed.
func sameTree(a *TreeNode, b *TreeNode) bool {
	pending := [][2]*TreeNode{{a, b}}
	for len(pending) > 0 {
		pair := pending[len(pending)-1]
		pending = pending[:len(pending)-1]
		left, right := pair[0], pair[1]
		if left == nil || right == nil {
			if left != right {
				return false
			}
			continue
		}
		if left.Val != right.Val {
			return false
		}
		pending = append(pending, [2]*TreeNode{left.Left, right.Left})
		pending = append(pending, [2]*TreeNode{left.Right, right.Right})
	}
	return true
}
