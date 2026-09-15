import "strconv"

// Parse the string into (depth, value) pairs: a run of dashes gives the
// depth, then a run of digits gives the value (values are guaranteed
// positive, so no '-' ever appears inside a digit run).
func recoverFromPreorder(traversal string) *TreeNode {
	n := len(traversal)
	i := 0
	stack := []*TreeNode{}
	for i < n {
		depth := 0
		for i < n && traversal[i] == '-' {
			depth++
			i++
		}
		j := i
		for j < n && traversal[j] >= '0' && traversal[j] <= '9' {
			j++
		}
		value, _ := strconv.Atoi(traversal[i:j])
		i = j
		// The node at this depth replaces everything deeper than it on the
		// current path; whatever remains on top is its parent.
		if len(stack) > depth {
			stack = stack[:depth]
		}
		node := &TreeNode{Val: value}
		if len(stack) > 0 {
			parent := stack[len(stack)-1]
			if parent.Left == nil {
				parent.Left = node
			} else {
				parent.Right = node
			}
		}
		stack = append(stack, node)
	}
	if len(stack) == 0 {
		return nil
	}
	return stack[0]
}
