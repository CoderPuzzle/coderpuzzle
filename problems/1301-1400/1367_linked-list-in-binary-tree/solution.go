// Bundle-provided types (assembled with this submission):
//   ListNode:  { field Val int, Next *ListNode }
//   TreeNode:  { field Val int, Left/Right *TreeNode }

func isSubPath(head *ListNode, root *TreeNode) bool {
	// Flatten the list once so matching works with plain indices.
	values := []int{}
	for node := head; node != nil; node = node.Next {
		values = append(values, node.Val)
	}
	if root == nil {
		return false
	}

	// Walk the whole tree; from every node that starts a match, follow it
	// downward with an explicit (node, index) stack.
	stack := []*TreeNode{root}
	for len(stack) > 0 {
		treeNode := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if matchFrom(treeNode, values) {
			return true
		}
		if treeNode.Left != nil {
			stack = append(stack, treeNode.Left)
		}
		if treeNode.Right != nil {
			stack = append(stack, treeNode.Right)
		}
	}
	return false
}

func matchFrom(start *TreeNode, values []int) bool {
	if len(values) == 0 || start.Val != values[0] {
		return false
	}
	type frame struct {
		node  *TreeNode
		index int
	}
	stack := []frame{{start, 0}}
	for len(stack) > 0 {
		current := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if current.index+1 == len(values) {
			return true
		}
		next := values[current.index+1]
		if current.node.Left != nil && current.node.Left.Val == next {
			stack = append(stack, frame{current.node.Left, current.index + 1})
		}
		if current.node.Right != nil && current.node.Right.Val == next {
			stack = append(stack, frame{current.node.Right, current.index + 1})
		}
	}
	return false
}
