// Number the positions the way a heap numbers them — root at 1, children
// of slot i at 2i and 2i+1. Draining the queue front-first surfaces nodes
// in exactly slot order (absent children ride along as nil placeholders),
// so the first nil drained is the first unoccupied slot, and any real
// node after it sits beyond a hole that completeness cannot afford.
func isCompleteTree(root *TreeNode) bool {
	pending := []*TreeNode{root}
	head := 0
	gapSeen := false
	for head < len(pending) {
		node := pending[head]
		head++
		switch {
		case node == nil:
			gapSeen = true
		case gapSeen:
			return false
		default:
			pending = append(pending, node.Left, node.Right)
		}
	}
	return true
}
