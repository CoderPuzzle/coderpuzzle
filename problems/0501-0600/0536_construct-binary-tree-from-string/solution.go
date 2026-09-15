import "strconv"

// The parens spell a preorder walk: every integer opens a node, and every
// parenthesized group is one whole subtree written right after the node that
// owns it. The stack holds the ancestors still open for children, so one
// left-to-right scan decides each node in the very order its pieces appear.
func str2tree(s string) *TreeNode {
	stack := []*TreeNode{}
	n := len(s)
	i := 0
	for i < n {
		switch s[i] {
		case '(':
			i++
		case ')':
			// A group just closed: the subtree on top is finished and
			// belongs to the node underneath — in the left slot if that is
			// still open, otherwise the right.
			child := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			if len(stack) > 0 {
				parent := stack[len(stack)-1]
				if parent.Left == nil {
					parent.Left = child
				} else {
					parent.Right = child
				}
			}
			i++
		default:
			// Anything else starts a value: a run of digits with an
			// optional leading '-', up to the next parenthesis.
			j := i
			for j < n && s[j] != '(' && s[j] != ')' {
				j++
			}
			val, _ := strconv.Atoi(s[i:j])
			stack = append(stack, &TreeNode{Val: val})
			i = j
		}
	}
	// Every node but the root is closed by its group's ')', so exactly the
	// root remains — or nothing, for the empty string.
	if len(stack) == 0 {
		return nil
	}
	return stack[0]
}
