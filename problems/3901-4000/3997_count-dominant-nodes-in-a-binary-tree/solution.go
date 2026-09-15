func dom(n *TreeNode) (int, int) {
	if n == nil {
		return -1, 0
	}
	a, x := dom(n.Left)
	b, y := dom(n.Right)
	m := n.Val
	if a > m {
		m = a
	}
	if b > m {
		m = b
	}
	z := 0
	if n.Val == m {
		z = 1
	}
	return m, x + y + z
}
func countDominantNodes(root *TreeNode) int { _, x := dom(root); return x }
