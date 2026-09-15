// A node under traversal: which child remains to visit (0 = left pending,
// 1 = right pending, 2 = ready to sum) plus the sums of the two subtrees
// already finished beneath it.
type frame struct {
	node  *TreeNode
	state int
	left  int
	right int
}

func findTilt(root *TreeNode) int64 {
	// Post-order, one pass: by the time a node is settled, both of its
	// subtrees have reported their sums, so its tilt |left - right| falls
	// out of those two numbers — a missing child reports 0 — and the same
	// visit yields the node's own sum for its parent. The traversal
	// carries its own stack of frames so a single 10^4-node chain never
	// strains the goroutine call stack.
	totalTilt := int64(0)
	// Every subtree sum stays within 10^4 nodes of 1000 each, so |sum| <=
	// 10^7 fits an int; only the running total of tilts is 64-bit — a
	// 10^4-node one-child chain of 1000s stacks up tilts 0 + 1000 + 2000 +
	// ... to almost 5 * 10^10.
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
			left, right := top.left, top.right
			tilt := left - right
			if tilt < 0 {
				tilt = -tilt
			}
			total := top.node.Val + left + right
			stack = stack[:len(stack)-1]
			totalTilt += int64(tilt)
			if len(stack) > 0 {
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
	return totalTilt
}
