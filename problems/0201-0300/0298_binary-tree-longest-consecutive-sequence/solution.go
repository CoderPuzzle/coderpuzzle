// A parked right child together with the length of the run ending at it.
type frame struct {
	node   *TreeNode
	length int
}

func longestConsecutive(root *TreeNode) int {
	// For every node, the consecutive run ending there is one longer than
	// its parent's run when the step is exactly +1, and 1 when it is not;
	// the answer is the maximum over all nodes. The traversal carries its
	// own stack so a single 3*10^4-node chain never strains the call stack.
	best := 0
	// Right children parked while the descent walks the left spine, each
	// with the run length already computed for it.
	pending := []frame{}
	node, length := root, 1
	for node != nil {
		if length > best {
			best = length
		}
		if node.Right != nil {
			// Extend into the right child, or restart the run there.
			run := 1
			if node.Right.Val == node.Val+1 {
				run = length + 1
			}
			pending = append(pending, frame{node.Right, run})
		}
		if node.Left != nil {
			// Descend left, extending or restarting the same way.
			if node.Left.Val == node.Val+1 {
				length = length + 1
			} else {
				length = 1
			}
			node = node.Left
		} else if len(pending) > 0 {
			last := pending[len(pending)-1]
			pending = pending[:len(pending)-1]
			node, length = last.node, last.length
		} else {
			node = nil
		}
	}
	return best
}
