// Two trees are leaf-similar exactly when their leaf value sequences
// agree, so the whole question is writing each sequence down and comparing
// them.
func leafSimilar(root1 *TreeNode, root2 *TreeNode) bool {
	a := leafValues(root1)
	b := leafValues(root2)
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

// The walk carries an explicit stack: pop a node, record its value when
// both children are missing — that node is a leaf — otherwise push the
// right child and then the left, so the left subtree is always the next to
// pop and the values come out in left-to-right order. Only leaves are
// recorded, so internal values and the shapes above the leaves never enter
// the comparison; an exhausted stack means the sequence is complete.
func leafValues(root *TreeNode) []int {
	values := []int{}
	pending := []*TreeNode{root}
	for len(pending) > 0 {
		node := pending[len(pending)-1]
		pending = pending[:len(pending)-1]
		if node.Left == nil && node.Right == nil {
			values = append(values, node.Val)
			continue
		}
		if node.Right != nil {
			pending = append(pending, node.Right)
		}
		if node.Left != nil {
			pending = append(pending, node.Left)
		}
	}
	return values
}
