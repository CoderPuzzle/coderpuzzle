// Flip equivalence is a question of pairing: some way of walking the trees
// together, committing at each paired node to the straight or the swapped
// alignment of children, must run out of nodes without a disagreement. The
// stack carries the pairs.
func flipEquiv(root1 *TreeNode, root2 *TreeNode) bool {
	pending := []pair{{root1, root2}}
	for len(pending) > 0 {
		p := pending[len(pending)-1]
		pending = pending[:len(pending)-1]
		a, b := p.a, p.b
		if a == nil && b == nil {
			continue
		}
		if a == nil || b == nil || a.Val != b.Val {
			return false
		}
		straight := aligned(a.Left, b.Left) && aligned(a.Right, b.Right)
		crossed := aligned(a.Left, b.Right) && aligned(a.Right, b.Left)
		switch {
		case straight:
			pending = append(pending, pair{a.Left, b.Left}, pair{a.Right, b.Right})
		case crossed:
			pending = append(pending, pair{a.Left, b.Right}, pair{a.Right, b.Left})
		default:
			return false
		}
	}
	return true
}

// Values are unique within each tree, which is what makes the commitment
// above exhaustive: both alignments can line up at a node only when they
// coincide, so testing the straight one first and falling back to the
// swapped one covers every flip choice.
func aligned(a *TreeNode, b *TreeNode) bool {
	if a == nil || b == nil {
		return a == b
	}
	return a.Val == b.Val
}

type pair struct {
	a, b *TreeNode
}
