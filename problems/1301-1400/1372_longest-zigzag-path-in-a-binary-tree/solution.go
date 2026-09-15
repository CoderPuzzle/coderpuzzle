// bundle-provided type (not editable here; the judge assembles its definition
// into every submission):
//   TreeNode:  { field Val int, Left/Right *TreeNode }

type zigFrame struct {
	node  *TreeNode
	state int
}

func longestZigZag(root *TreeNode) int {
	if root == nil {
		return 0
	}
	// Iterative post-order: state 0 expands children, state 1 combines.
	// runs stores each node's [left-arrival, right-arrival] run lengths.
	best := 0
	runs := map[*TreeNode][2]int{}
	stack := []zigFrame{{root, 0}}
	for len(stack) > 0 {
		frame := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if frame.state == 1 {
			leftRun := 0
			if frame.node.Left != nil {
				leftRun = 1 + runs[frame.node.Left][1]
			}
			rightRun := 0
			if frame.node.Right != nil {
				rightRun = 1 + runs[frame.node.Right][0]
			}
			runs[frame.node] = [2]int{leftRun, rightRun}
			if leftRun > best {
				best = leftRun
			}
			if rightRun > best {
				best = rightRun
			}
			continue
		}
		stack = append(stack, zigFrame{frame.node, 1})
		if frame.node.Left != nil {
			stack = append(stack, zigFrame{frame.node.Left, 0})
		}
		if frame.node.Right != nil {
			stack = append(stack, zigFrame{frame.node.Right, 0})
		}
	}
	return best
}
