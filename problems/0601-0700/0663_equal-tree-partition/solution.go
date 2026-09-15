// A node under traversal: which child remains to visit (0 = left pending,
// 1 = right pending, 2 = ready to sum) plus the sums of the two subtrees
// already finished beneath it.
type frame struct {
	node  *TreeNode
	state int
	left  int64
	right int64
}

func checkEqualTree(root *TreeNode) bool {
	// Removing one edge detaches exactly one subtree; the two parts are
	// that subtree and everything else, so the split is equal exactly when
	// some subtree sums to half of the whole tree's total. One post-order
	// pass computes every subtree sum, and the root's own sum, the last to
	// finish, is that total. The traversal carries its own stack of frames
	// so a single 10^4-node chain never strains the goroutine call stack.
	sums := make(map[int64]bool)
	total := int64(0)
	// Sums reach 10^4 nodes of 10^5 each — |sum| up to 10^9, at the very
	// rim of a 32-bit int — so accumulation is 64-bit throughout.
	stack := []frame{}
	if root != nil {
		stack = append(stack, frame{node: root})
	}
	for len(stack) > 0 {
		top := &stack[len(stack)-1]
		if top.state == 0 {
			top.state = 1
			if top.node.Left != nil {
				stack = append(stack, frame{node: top.node.Left})
			}
		} else if top.state == 1 {
			top.state = 2
			if top.node.Right != nil {
				stack = append(stack, frame{node: top.node.Right})
			}
		} else {
			total = int64(top.node.Val) + top.left + top.right
			stack = stack[:len(stack)-1]
			if len(stack) > 0 {
				// A parent still waits above, so this was a proper subtree
				// — the only cut candidates. The whole tree never counts
				// as a part: with total 0 the root's own sum would match
				// its half spuriously.
				sums[total] = true
				parent := &stack[len(stack)-1]
				// The parent's state tells which subtree just finished:
				// 1 = its left child, 2 = its right child.
				if parent.state == 1 {
					parent.left = total
				} else {
					parent.right = total
				}
			}
		}
	}
	// An odd total never halves into integers — parity still bites with
	// negatives (-9 is as odd as 9).
	return total%2 == 0 && sums[total/2]
}
