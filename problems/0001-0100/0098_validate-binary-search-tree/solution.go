import "math"

// frame pairs a subtree with the open interval (lo, hi) it is confined to.
// Bounds are int64: node values reach the int32 extremes, so the initial
// interval must be strictly wider than any value can be.
type frame struct {
	node *TreeNode
	lo   int64
	hi   int64
}

func isValidBST(root *TreeNode) bool {
	// Preorder with an explicit stack — the same shape in every language,
	// chosen because recursion would overflow Python's call-stack limit
	// on a 10'000-node chain.
	stack := []frame{{root, math.MinInt64, math.MaxInt64}}
	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if top.node == nil {
			// An empty subtree satisfies every bound vacuously.
			continue
		}
		value := int64(top.node.Val)
		// Strict on both sides: equal keys falsify a BST.
		if value <= top.lo || value >= top.hi {
			return false
		}
		stack = append(stack, frame{top.node.Left, top.lo, value})
		stack = append(stack, frame{top.node.Right, value, top.hi})
	}
	return true
}
