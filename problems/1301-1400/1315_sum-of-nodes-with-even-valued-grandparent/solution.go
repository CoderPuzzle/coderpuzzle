func sumEvenGrandparent(root *TreeNode) int {
	// Each stack entry carries (node, parent value, grandparent value) so the
	// parity test needs no upward links. Explicit stack: the tree may be a
	// 10^4-node chain, beyond any recursion budget.
	type entry struct {
		node                *TreeNode
		parent, grandparent int
	}
	none := 1 // odd sentinel: contributes nothing
	total := 0
	stack := []entry{{root, none, none}}
	for len(stack) > 0 {
		e := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if e.node == nil {
			continue
		}
		if e.grandparent%2 == 0 {
			total += e.node.Val
		}
		stack = append(stack, entry{e.node.Left, e.node.Val, e.parent})
		stack = append(stack, entry{e.node.Right, e.node.Val, e.parent})
	}
	return total
}
