type entry struct {
	node  *TreeNode
	apply bool
}

// The tree is a formula: leaves hold the literals (1 is true, 0 is
// false) and internal nodes apply their operator — 2 ORs the two child
// bits, 3 ANDs them — so the answer is a post-order fold. Spines of
// this tree can run hundreds of nodes deep, so the fold runs on
// explicit stacks instead of the call stack: entries say either "expand
// this node" or "apply this operator". Expanding an internal node parks
// its operator beneath its children, left on top; because the tree is
// full, each subtree's entries net out to exactly one bit, so an
// operator resurfaces only after its two operands sit ready on the
// operand shelf.
func evaluateTree(root *TreeNode) bool {
	if root == nil {
		return false
	}
	var operands []bool
	work := []entry{{root, false}}
	for len(work) > 0 {
		top := work[len(work)-1]
		work = work[:len(work)-1]
		if !top.apply {
			if top.node.Left == nil || top.node.Right == nil {
				operands = append(operands, top.node.Val == 1)
			} else {
				work = append(work, entry{top.node, true})
				work = append(work, entry{top.node.Right, false})
				work = append(work, entry{top.node.Left, false})
			}
		} else {
			right := operands[len(operands)-1]
			operands = operands[:len(operands)-1]
			left := operands[len(operands)-1]
			operands = operands[:len(operands)-1]
			value := left && right
			if top.node.Val == 2 {
				value = left || right
			}
			operands = append(operands, value)
		}
	}
	return operands[len(operands)-1]
}
