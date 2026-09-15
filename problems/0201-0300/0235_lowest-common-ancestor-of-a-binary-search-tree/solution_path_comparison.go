// pathTo walks a target home in a straight line: every node recorded is a
// strict ancestor-or-self of the target.
func pathTo(root *TreeNode, target int) []int {
	path := []int{}
	node := root
	for node.Val != target {
		path = append(path, node.Val)
		if target < node.Val {
			node = node.Left
		} else {
			node = node.Right
		}
	}
	return append(path, target)
}

func lowestCommonAncestor(root *TreeNode, p int, q int) int {
	// Two written-down paths instead of one simultaneous descent.
	first := pathTo(root, p)
	second := pathTo(root, q)
	// Shared entries are exactly the shared ancestors; read both lists in
	// lockstep until they split (or one ends, when one target sits above
	// the other) and report the last value they agreed on.
	answer := first[0]
	for i := 0; i < len(first) && i < len(second); i++ {
		if first[i] != second[i] {
			break
		}
		answer = first[i]
	}
	return answer
}
